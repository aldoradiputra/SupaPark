// Package gate controls the physical gate relay. Unchanged from the original
// edge binary — only included here so the reference build is runnable.
package gate

import (
	"context"
	"log"
)

type Controller interface {
	Open(ctx context.Context) error
	Close(ctx context.Context) error
}

// RelayController is a stub for the GPIO relay on the Raspberry Pi. Swap in the
// real relay driver from the production binary.
type RelayController struct {
	name string
}

func NewRelay(name string) *RelayController { return &RelayController{name: name} }

func (r *RelayController) Open(_ context.Context) error {
	log.Printf("[gate %s] OPEN", r.name)
	return nil
}

func (r *RelayController) Close(_ context.Context) error {
	log.Printf("[gate %s] CLOSE", r.name)
	return nil
}
