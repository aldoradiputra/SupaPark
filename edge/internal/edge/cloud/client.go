// Package cloud is the HTTP client for the Supabase Edge Functions. The
// edge↔cloud contract is versioned by function name, not URL path.
package cloud

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/aldoradiputra/supapark/edge/internal/edge/model"
)

type Client struct {
	baseURL    string
	anonKey    string
	laneAPIKey string
	http       *http.Client
}

func New(baseURL, anonKey, laneAPIKey string, timeout time.Duration) *Client {
	return &Client{
		baseURL:    strings.TrimRight(baseURL, "/"),
		anonKey:    anonKey,
		laneAPIKey: laneAPIKey,
		http:       &http.Client{Timeout: timeout},
	}
}

func (c *Client) fnURL(name string) string {
	return c.baseURL + "/functions/v1/" + name
}

func (c *Client) setHeaders(req *http.Request, withBody bool) {
	// Supabase's API gateway requires the anon key; the edge function itself
	// verifies the lane via X-API-Key.
	req.Header.Set("Authorization", "Bearer "+c.anonKey)
	req.Header.Set("apikey", c.anonKey)
	req.Header.Set("X-API-Key", c.laneAPIKey)
	if withBody {
		req.Header.Set("Content-Type", "application/json")
	}
}

func (c *Client) postJSON(ctx context.Context, name string, body, out any) error {
	payload, err := json.Marshal(body)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(
		ctx, http.MethodPost, c.fnURL(name), bytes.NewReader(payload))
	if err != nil {
		return err
	}
	c.setHeaders(req, true)

	resp, err := c.http.Do(req)
	if err != nil {
		return err // transport error -> caller falls back to offline
	}
	defer resp.Body.Close()

	data, _ := io.ReadAll(resp.Body)
	if resp.StatusCode >= 400 {
		return fmt.Errorf("%s: status %d: %s", name, resp.StatusCode, strings.TrimSpace(string(data)))
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return fmt.Errorf("%s: decode: %w", name, err)
		}
	}
	return nil
}

// Ping reports transport-level reachability. Any HTTP response (even 401/405)
// counts as online; only a transport error means offline.
func (c *Client) Ping(ctx context.Context) bool {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, c.fnURL("lane-heartbeat"), nil)
	if err != nil {
		return false
	}
	c.setHeaders(req, false)
	resp, err := c.http.Do(req)
	if err != nil {
		return false
	}
	_ = resp.Body.Close()
	return true
}

func (c *Client) Entry(ctx context.Context, in model.EntryRequest) (model.EntryResponse, error) {
	var out model.EntryResponse
	err := c.postJSON(ctx, "session-entry", in, &out)
	return out, err
}

func (c *Client) Exit(ctx context.Context, in model.ExitRequest) (model.ExitResponse, error) {
	var out model.ExitResponse
	err := c.postJSON(ctx, "session-exit", in, &out)
	return out, err
}

func (c *Client) Sync(ctx context.Context, in model.SyncRequest) (model.SyncResponse, error) {
	var out model.SyncResponse
	err := c.postJSON(ctx, "session-sync", in, &out)
	return out, err
}

func (c *Client) Heartbeat(ctx context.Context, in model.HeartbeatRequest) error {
	return c.postJSON(ctx, "lane-heartbeat", in, nil)
}
