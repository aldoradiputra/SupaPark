package model

import "testing"

func TestNormalizePlate(t *testing.T) {
	cases := map[string]string{
		"b 1234 abc": "B1234ABC",
		"B-1234-ABC": "B1234ABC",
		" d 9 z ":    "D9Z",
		"":            "",
	}
	for in, want := range cases {
		if got := NormalizePlate(in); got != want {
			t.Errorf("NormalizePlate(%q) = %q, want %q", in, got, want)
		}
	}
}

func TestNewID(t *testing.T) {
	id := NewID()
	if len(id) != 36 {
		t.Fatalf("len(%q) = %d, want 36", id, len(id))
	}
	if id[14] != '4' { // UUIDv4 version nibble
		t.Errorf("expected v4 marker at index 14, got %q", string(id[14]))
	}
	if NewID() == id {
		t.Error("NewID returned duplicates")
	}
}
