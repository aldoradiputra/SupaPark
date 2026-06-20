// Package detector is the per-lane loop: it consumes ALPR detections and drives
// the gate. The ALPR pipeline, gate control and SSE booth updates are unchanged
// in spirit; only the cloud calls now target the Supabase Edge Functions, with
// a BoltDB fallback when the cloud is unreachable.
package detector

import (
	"context"
	"log"
	"time"

	"github.com/aldoradiputra/supapark/edge/internal/edge"
	"github.com/aldoradiputra/supapark/edge/internal/edge/alpr"
	"github.com/aldoradiputra/supapark/edge/internal/edge/cloud"
	"github.com/aldoradiputra/supapark/edge/internal/edge/gate"
	"github.com/aldoradiputra/supapark/edge/internal/edge/model"
	"github.com/aldoradiputra/supapark/edge/internal/edge/sse"
	"github.com/aldoradiputra/supapark/edge/internal/edge/store"
)

type Loop struct {
	cfg    edge.Config
	cloud  *cloud.Client
	store  *store.Store
	gate   gate.Controller
	sse    *sse.Broker
	source alpr.Source
}

func New(
	cfg edge.Config,
	cl *cloud.Client,
	st *store.Store,
	g gate.Controller,
	br *sse.Broker,
	src alpr.Source,
) *Loop {
	return &Loop{cfg: cfg, cloud: cl, store: st, gate: g, sse: br, source: src}
}

func (l *Loop) Run(ctx context.Context) {
	log.Printf("[detector] lane %s (%s) running", l.cfg.LaneID, l.cfg.LaneType)
	for {
		select {
		case <-ctx.Done():
			return
		case d, ok := <-l.source.Detections():
			if !ok {
				return
			}
			if l.cfg.LaneType == edge.LaneExit {
				l.handleExit(ctx, d)
			} else {
				l.handleEntry(ctx, d)
			}
		}
	}
}

// cloudEntry -> session-entry, falling back to the offline queue.
func (l *Loop) handleEntry(ctx context.Context, d model.Detection) {
	norm := d.PlateNormalized
	if norm == "" {
		norm = model.NormalizePlate(d.Plate)
	}

	cctx, cancel := context.WithTimeout(ctx, l.cfg.CloudTimeout)
	resp, err := l.cloud.Entry(cctx, model.EntryRequest{
		Plate:           d.Plate,
		PlateNormalized: norm,
		VehicleType:     d.VehicleType,
		Confidence:      d.Confidence,
		LaneID:          l.cfg.LaneID,
	})
	cancel()

	if err != nil {
		log.Printf("[detector] entry offline (%v) -> queue", err)
		l.enqueue(model.EdgeSession{
			EdgeSessionID: model.NewID(),
			Plate:         d.Plate,
			VehicleType:   d.VehicleType,
			EntryTime:     time.Now().UTC(),
			SessionStatus: "active",
			PaymentStatus: "pending",
		})
		l.sse.Publish("entry_offline", map[string]any{"plate": d.Plate})
		_ = l.gate.Open(ctx) // fail-open: never trap a vehicle at entry
		return
	}

	l.sse.Publish("entry", resp)
	_ = l.gate.Open(ctx)
}

// cloudExit -> session-exit, falling back to the offline queue.
func (l *Loop) handleExit(ctx context.Context, d model.Detection) {
	norm := d.PlateNormalized
	if norm == "" {
		norm = model.NormalizePlate(d.Plate)
	}

	cctx, cancel := context.WithTimeout(ctx, l.cfg.CloudTimeout)
	resp, err := l.cloud.Exit(cctx, model.ExitRequest{
		Plate:           d.Plate,
		PlateNormalized: norm,
		LaneID:          l.cfg.LaneID,
	})
	cancel()

	if err != nil {
		log.Printf("[detector] exit offline (%v) -> queue", err)
		l.queueOfflineExit(norm, d)
		l.sse.Publish("exit_offline", map[string]any{"plate": d.Plate})
		_ = l.gate.Open(ctx) // fail-open; reconcile payment on sync
		return
	}

	l.sse.Publish("exit", resp)
	// Stub QRIS auto-settles, so payment_status is "paid" on exit. In a real
	// payment flow the gate waits for settlement before opening.
	if resp.PaymentStatus == "paid" {
		_ = l.gate.Open(ctx)
	}
}

func (l *Loop) enqueue(sess model.EdgeSession) {
	if err := l.store.Enqueue(sess); err != nil {
		log.Printf("[detector] enqueue failed: %v", err)
	}
}

// queueOfflineExit pairs with a locally-queued active session (offline entry)
// when present; otherwise records a standalone completed marker for the cloud
// to reconcile on sync.
func (l *Loop) queueOfflineExit(norm string, d model.Detection) {
	now := time.Now().UTC()
	if active := l.findActive(norm); active != nil {
		dur := int(now.Sub(active.EntryTime).Minutes())
		active.ExitTime = &now
		active.DurationMin = &dur
		active.SessionStatus = "completed"
		active.PaymentStatus = "pending"
		l.enqueue(*active)
		return
	}
	l.enqueue(model.EdgeSession{
		EdgeSessionID: model.NewID(),
		Plate:         d.Plate,
		VehicleType:   d.VehicleType,
		EntryTime:     now,
		ExitTime:      &now,
		SessionStatus: "completed",
		PaymentStatus: "pending",
	})
}

func (l *Loop) findActive(norm string) *model.EdgeSession {
	pending, err := l.store.Pending(0)
	if err != nil {
		return nil
	}
	for i := range pending {
		s := pending[i]
		if s.SessionStatus == "active" && model.NormalizePlate(s.Plate) == norm {
			return &s
		}
	}
	return nil
}
