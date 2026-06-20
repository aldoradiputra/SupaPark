// Package model holds the data shared between the edge components and the
// request/response contracts for the Supabase Edge Functions
// (session-entry, session-exit, session-sync, lane-heartbeat).
package model

import (
	"crypto/rand"
	"fmt"
	"strings"
	"time"
)

type VehicleType string

const (
	Car        VehicleType = "car"
	Motorcycle VehicleType = "motorcycle"
)

// Detection is one ALPR read from a lane camera.
type Detection struct {
	Plate           string
	PlateNormalized string
	VehicleType     VehicleType
	Confidence      float64
}

// EdgeSession is the offline-queue record pushed to session-sync. JSON tags
// match the edge function contract.
type EdgeSession struct {
	EdgeSessionID string      `json:"edge_session_id"`
	Plate         string      `json:"plate"`
	VehicleType   VehicleType `json:"vehicle_type,omitempty"`
	EntryTime     time.Time   `json:"entry_time"`
	ExitTime      *time.Time  `json:"exit_time,omitempty"`
	DurationMin   *int        `json:"duration_min,omitempty"`
	FeeCalculated int         `json:"fee_calculated"`
	FeePaid       int         `json:"fee_paid"`
	PaymentMethod string      `json:"payment_method,omitempty"`
	PaymentStatus string      `json:"payment_status,omitempty"`
	SessionStatus string      `json:"session_status,omitempty"`
	IsMember      bool        `json:"is_member"`
	NotifyOnSync  bool        `json:"notify_on_sync,omitempty"`
}

// ----- session-entry -----

type EntryRequest struct {
	Plate           string      `json:"plate"`
	PlateNormalized string      `json:"plate_normalized,omitempty"`
	VehicleType     VehicleType `json:"vehicle_type,omitempty"`
	Confidence      float64     `json:"confidence,omitempty"`
	LaneID          string      `json:"lane_id,omitempty"`
}

type TariffInfo struct {
	FirstHour int `json:"first_hour"`
	NextHour  int `json:"next_hour"`
	MaxDaily  int `json:"max_daily"`
	GraceMin  int `json:"grace_min"`
}

type EntryResponse struct {
	SessionID      string      `json:"session_id"`
	IsMember       bool        `json:"is_member"`
	Phone          *string     `json:"phone"`
	TariffInfo     *TariffInfo `json:"tariff_info"`
	SlotsAvailable int         `json:"slots_available"`
}

// ----- session-exit -----

type ExitRequest struct {
	Plate           string `json:"plate"`
	PlateNormalized string `json:"plate_normalized,omitempty"`
	LaneID          string `json:"lane_id,omitempty"`
}

type ExitResponse struct {
	SessionID     string  `json:"session_id"`
	Plate         string  `json:"plate"`
	Fee           int     `json:"fee"`
	IsMember      bool    `json:"is_member"`
	PaymentStatus string  `json:"payment_status"`
	QRString      *string `json:"qr_string"`
	QRURL         *string `json:"qr_url"`
	PaymentID     *string `json:"payment_id"`
}

// ----- session-sync -----

type SyncRequest struct {
	Sessions []EdgeSession `json:"sessions"`
}

type SyncResponse struct {
	Synced int `json:"synced"`
	Errors int `json:"errors"`
}

// ----- lane-heartbeat -----

type HeartbeatRequest struct {
	LaneID          string `json:"lane_id"`
	Status          string `json:"status"`
	FirmwareVersion string `json:"firmware_version,omitempty"`
}

// NormalizePlate mirrors the DB generated column: upper-case, alphanumerics.
func NormalizePlate(plate string) string {
	var b strings.Builder
	for _, r := range strings.ToUpper(plate) {
		if (r >= 'A' && r <= 'Z') || (r >= '0' && r <= '9') {
			b.WriteRune(r)
		}
	}
	return b.String()
}

// NewID returns a random UUIDv4 (used as edge_session_id for offline sessions).
func NewID() string {
	var b [16]byte
	_, _ = rand.Read(b[:])
	b[6] = (b[6] & 0x0f) | 0x40
	b[8] = (b[8] & 0x3f) | 0x80
	return fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:16])
}
