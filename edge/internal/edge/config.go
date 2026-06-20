// Package edge holds edge-wide configuration.
package edge

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type LaneType string

const (
	LaneEntry LaneType = "entry"
	LaneExit  LaneType = "exit"
)

// Config is loaded from the environment. The Supabase fields replace the old
// custom-cloud settings (EDGE_CLOUD_URL / EDGE_API_KEY).
type Config struct {
	// Supabase (replaces EDGE_CLOUD_URL).
	SupabaseURL     string // EDGE_SUPABASE_URL   e.g. https://xxx.supabase.co
	SupabaseAnonKey string // EDGE_SUPABASE_ANON_KEY
	LaneAPIKey      string // EDGE_LANE_API_KEY   (replaces EDGE_API_KEY)

	// Lane identity.
	LaneID          string
	LocationID      string // informational; the lane API key derives the location server-side
	LaneType        LaneType
	FirmwareVersion string

	// Hardware.
	AlprMock  bool   // EDGE_ALPR_MOCK — use the mock ALPR source
	RelayType string // EDGE_RELAY_TYPE — gpio | stub

	// Local + behaviour.
	HTTPAddr          string
	BoltPath          string
	CloudTimeout      time.Duration // fixed at 5s: fast fail -> offline mode
	SyncInterval      time.Duration
	HeartbeatInterval time.Duration
}

func Load() (Config, error) {
	c := Config{
		SupabaseURL:       os.Getenv("EDGE_SUPABASE_URL"),
		SupabaseAnonKey:   os.Getenv("EDGE_SUPABASE_ANON_KEY"),
		LaneAPIKey:        os.Getenv("EDGE_LANE_API_KEY"),
		LaneID:            os.Getenv("EDGE_LANE_ID"),
		LocationID:        os.Getenv("EDGE_LOCATION_ID"),
		LaneType:          LaneType(getenv2("EDGE_LANE_MODE", "EDGE_LANE_TYPE", "entry")),
		FirmwareVersion:   getenv("EDGE_FIRMWARE_VERSION", "0.0.0-dev"),
		AlprMock:          getbool("EDGE_ALPR_MOCK", true),
		RelayType:         getenv("EDGE_RELAY_TYPE", "gpio"),
		HTTPAddr:          getenv("EDGE_HTTP_ADDR", ":8080"),
		BoltPath:          getenv("EDGE_BOLT_PATH", "supapark-edge.db"),
		CloudTimeout:      5 * time.Second,
		SyncInterval:      getdur("EDGE_SYNC_INTERVAL", 15*time.Second),
		HeartbeatInterval: getdur("EDGE_HEARTBEAT_INTERVAL", 30*time.Second),
	}

	if c.SupabaseURL == "" || c.SupabaseAnonKey == "" || c.LaneAPIKey == "" {
		return c, fmt.Errorf(
			"EDGE_SUPABASE_URL, EDGE_SUPABASE_ANON_KEY and EDGE_LANE_API_KEY are required")
	}
	if c.LaneType != LaneEntry && c.LaneType != LaneExit {
		return c, fmt.Errorf("EDGE_LANE_TYPE must be %q or %q", LaneEntry, LaneExit)
	}
	return c, nil
}

func getenv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

// getenv2 reads primary, then a fallback key, then a default.
func getenv2(primary, fallback, def string) string {
	if v := os.Getenv(primary); v != "" {
		return v
	}
	if v := os.Getenv(fallback); v != "" {
		return v
	}
	return def
}

func getbool(key string, def bool) bool {
	v := os.Getenv(key)
	if v == "" {
		return def
	}
	return v == "1" || strings.EqualFold(v, "true") || strings.EqualFold(v, "yes")
}

func getdur(key string, def time.Duration) time.Duration {
	if v := os.Getenv(key); v != "" {
		if d, err := time.ParseDuration(v); err == nil {
			return d
		}
	}
	return def
}
