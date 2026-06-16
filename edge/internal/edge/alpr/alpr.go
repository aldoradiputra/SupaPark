// Package alpr is the plate-detection source. The real ALPR pipeline is
// unchanged in the production binary; here it's reduced to the Source interface
// plus a manual stub so the reference build runs.
package alpr

import "github.com/aldoradiputra/supapark/edge/internal/edge/model"

// Source emits plate detections from the lane camera.
type Source interface {
	Detections() <-chan model.Detection
}

// ManualSource lets you feed detections in (test harness / keypad) while the
// real ALPR pipeline is ported across.
type ManualSource struct {
	ch chan model.Detection
}

func NewManualSource() *ManualSource {
	return &ManualSource{ch: make(chan model.Detection, 8)}
}

func (m *ManualSource) Detections() <-chan model.Detection { return m.ch }

// Feed pushes a detection into the loop.
func (m *ManualSource) Feed(d model.Detection) { m.ch <- d }
