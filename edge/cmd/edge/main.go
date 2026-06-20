// Command edge is the per-lane Raspberry Pi binary. It wires config + the
// Supabase cloud client + the offline store into the detector loop and sync
// engine, and serves the local booth screen (SSE + PWA) over HTTP.
package main

import (
	"context"
	"embed"
	"errors"
	"io/fs"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/aldoradiputra/supapark/edge/internal/edge"
	"github.com/aldoradiputra/supapark/edge/internal/edge/alpr"
	"github.com/aldoradiputra/supapark/edge/internal/edge/cloud"
	"github.com/aldoradiputra/supapark/edge/internal/edge/detector"
	"github.com/aldoradiputra/supapark/edge/internal/edge/gate"
	"github.com/aldoradiputra/supapark/edge/internal/edge/sse"
	"github.com/aldoradiputra/supapark/edge/internal/edge/store"
	syncengine "github.com/aldoradiputra/supapark/edge/internal/edge/sync"
)

//go:embed web
var webRoot embed.FS

var webFS, _ = fs.Sub(webRoot, "web")

func main() {
	log.SetFlags(log.LstdFlags | log.Lmsgprefix)

	cfg, err := edge.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	st, err := store.Open(cfg.BoltPath)
	if err != nil {
		log.Fatalf("store: %v", err)
	}
	defer st.Close()

	cl := cloud.New(cfg.SupabaseURL, cfg.SupabaseAnonKey, cfg.LaneAPIKey, cfg.CloudTimeout)
	broker := sse.NewBroker()
	relay := gate.NewRelay(cfg.RelayType)

	if !cfg.AlprMock {
		log.Printf("[edge] EDGE_ALPR_MOCK=false, but the real ALPR pipeline is not wired in this reference; using the mock source")
	}
	// The real ALPR pipeline feeds detections via source.Feed(...).
	source := alpr.NewManualSource()

	log.Printf("[edge] lane=%s mode=%s location=%s relay=%s firmware=%s",
		cfg.LaneID, cfg.LaneType, cfg.LocationID, cfg.RelayType, cfg.FirmwareVersion)

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	engine := syncengine.New(cfg, cl, st)
	go engine.Run(ctx)

	loop := detector.New(cfg, cl, st, relay, broker, source)
	go loop.Run(ctx)

	// Local booth screen: SSE stream + PWA static files (entry/exit screens).
	mux := http.NewServeMux()
	mux.Handle("/events", broker)
	mux.Handle("/", http.FileServer(http.FS(webFS)))
	srv := &http.Server{
		Addr:              cfg.HTTPAddr,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
	}
	go func() {
		log.Printf("[http] booth UI + SSE on %s", cfg.HTTPAddr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Printf("[http] %v", err)
		}
	}()

	<-ctx.Done()
	log.Printf("shutting down…")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_ = srv.Shutdown(shutdownCtx)
}
