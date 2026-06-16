// Package sync is the background engine: it heartbeats the lane and drains the
// offline queue to Supabase when reachable. If Supabase is down it simply stays
// queued (offline mode), exactly as before.
package sync

import (
	"context"
	"log"
	"sync/atomic"
	"time"

	"github.com/aldoradiputra/supapark/edge/internal/edge"
	"github.com/aldoradiputra/supapark/edge/internal/edge/cloud"
	"github.com/aldoradiputra/supapark/edge/internal/edge/model"
	"github.com/aldoradiputra/supapark/edge/internal/edge/store"
)

const syncBatch = 100

type Engine struct {
	cfg    edge.Config
	cloud  *cloud.Client
	store  *store.Store
	online atomic.Bool
}

func New(cfg edge.Config, cl *cloud.Client, st *store.Store) *Engine {
	return &Engine{cfg: cfg, cloud: cl, store: st}
}

func (e *Engine) Online() bool { return e.online.Load() }

func (e *Engine) Run(ctx context.Context) {
	syncTick := time.NewTicker(e.cfg.SyncInterval)
	defer syncTick.Stop()
	heartbeatTick := time.NewTicker(e.cfg.HeartbeatInterval)
	defer heartbeatTick.Stop()

	// Fire both immediately on startup.
	e.heartbeat(ctx)
	e.drain(ctx)

	for {
		select {
		case <-ctx.Done():
			return
		case <-heartbeatTick.C:
			e.heartbeat(ctx)
		case <-syncTick.C:
			e.drain(ctx)
		}
	}
}

func (e *Engine) heartbeat(ctx context.Context) {
	hctx, cancel := context.WithTimeout(ctx, e.cfg.CloudTimeout)
	defer cancel()
	err := e.cloud.Heartbeat(hctx, model.HeartbeatRequest{
		LaneID:          e.cfg.LaneID,
		Status:          "online",
		FirmwareVersion: e.cfg.FirmwareVersion,
	})
	if err != nil {
		log.Printf("[sync] heartbeat failed: %v", err)
		e.setOnline(false)
		return
	}
	e.setOnline(true)
}

// drain pushes queued sessions to Supabase. Health is checked first so we don't
// burn the 5s timeout per call when offline.
func (e *Engine) drain(ctx context.Context) {
	pctx, cancel := context.WithTimeout(ctx, e.cfg.CloudTimeout)
	online := e.cloud.Ping(pctx)
	cancel()
	e.setOnline(online)
	if !online {
		return // stay queued
	}

	pending, err := e.store.Pending(syncBatch)
	if err != nil {
		log.Printf("[sync] read queue: %v", err)
		return
	}
	if len(pending) == 0 {
		return
	}

	sctx, cancel2 := context.WithTimeout(ctx, e.cfg.CloudTimeout)
	res, err := e.cloud.Sync(sctx, model.SyncRequest{Sessions: pending})
	cancel2()
	if err != nil {
		log.Printf("[sync] push failed: %v", err)
		e.setOnline(false)
		return
	}

	// Upserts are idempotent, so clearing what we sent is safe.
	ids := make([]string, 0, len(pending))
	for _, s := range pending {
		ids = append(ids, s.EdgeSessionID)
	}
	if err := e.store.Delete(ids...); err != nil {
		log.Printf("[sync] clear queue: %v", err)
	}
	log.Printf("[sync] pushed %d (synced=%d errors=%d)", len(pending), res.Synced, res.Errors)
}

func (e *Engine) setOnline(v bool) {
	if e.online.Swap(v) != v {
		if v {
			log.Printf("[sync] cloud ONLINE")
		} else {
			log.Printf("[sync] cloud OFFLINE")
		}
	}
}
