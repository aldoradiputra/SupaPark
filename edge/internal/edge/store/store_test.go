package store

import (
	"path/filepath"
	"testing"

	"github.com/aldoradiputra/supapark/edge/internal/edge/model"
)

func openTemp(t *testing.T) *Store {
	t.Helper()
	s, err := Open(filepath.Join(t.TempDir(), "test.db"))
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	t.Cleanup(func() { _ = s.Close() })
	return s
}

func TestQueueRoundtrip(t *testing.T) {
	s := openTemp(t)

	if err := s.Enqueue(model.EdgeSession{EdgeSessionID: "a", Plate: "B 1 X", SessionStatus: "active"}); err != nil {
		t.Fatal(err)
	}
	if err := s.Enqueue(model.EdgeSession{EdgeSessionID: "b", Plate: "B 2 Y", SessionStatus: "completed"}); err != nil {
		t.Fatal(err)
	}

	if n, _ := s.Count(); n != 2 {
		t.Fatalf("count = %d, want 2", n)
	}
	if pending, _ := s.Pending(0); len(pending) != 2 {
		t.Fatalf("pending = %d, want 2", len(pending))
	}
	if pending, _ := s.Pending(1); len(pending) != 1 {
		t.Fatalf("limited pending = %d, want 1", len(pending))
	}

	// Re-enqueue with the same id replaces (idempotent), doesn't duplicate.
	if err := s.Enqueue(model.EdgeSession{EdgeSessionID: "a", Plate: "B 1 X", SessionStatus: "completed"}); err != nil {
		t.Fatal(err)
	}
	if n, _ := s.Count(); n != 2 {
		t.Fatalf("count after replace = %d, want 2", n)
	}

	if err := s.Delete("a", "b"); err != nil {
		t.Fatal(err)
	}
	if n, _ := s.Count(); n != 0 {
		t.Fatalf("count after delete = %d, want 0", n)
	}
}

func TestEnqueueRequiresID(t *testing.T) {
	s := openTemp(t)
	if err := s.Enqueue(model.EdgeSession{Plate: "B 1 X"}); err == nil {
		t.Fatal("expected error for empty edge_session_id")
	}
}
