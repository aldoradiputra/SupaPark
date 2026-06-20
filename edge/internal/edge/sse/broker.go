// Package sse is the local Server-Sent-Events broker that pushes events to the
// booth screen (PWA). Unchanged in spirit from the original edge binary; the
// edge uses SSE locally rather than Supabase Realtime.
package sse

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

type Broker struct {
	mu   sync.Mutex
	subs map[chan []byte]struct{}
}

func NewBroker() *Broker {
	return &Broker{subs: make(map[chan []byte]struct{})}
}

// Publish fan-outs an event to every connected booth screen. Slow subscribers
// are skipped rather than blocking the caller.
func (b *Broker) Publish(event string, payload any) {
	data, err := json.Marshal(payload)
	if err != nil {
		return
	}
	msg := []byte(fmt.Sprintf("event: %s\ndata: %s\n\n", event, data))

	b.mu.Lock()
	defer b.mu.Unlock()
	for ch := range b.subs {
		select {
		case ch <- msg:
		default:
		}
	}
}

func (b *Broker) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	ch := make(chan []byte, 8)
	b.mu.Lock()
	b.subs[ch] = struct{}{}
	b.mu.Unlock()
	defer func() {
		b.mu.Lock()
		delete(b.subs, ch)
		b.mu.Unlock()
	}()

	fmt.Fprint(w, ": connected\n\n")
	flusher.Flush()

	for {
		select {
		case <-r.Context().Done():
			return
		case msg := <-ch:
			_, _ = w.Write(msg)
			flusher.Flush()
		}
	}
}
