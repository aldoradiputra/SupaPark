// Package store is the BoltDB-backed offline session queue. It is unchanged in
// spirit from the original edge binary: durable across restarts so the lane
// keeps working when Supabase is unreachable.
package store

import (
	"encoding/json"
	"fmt"
	"time"

	bolt "go.etcd.io/bbolt"

	"github.com/aldoradiputra/supapark/edge/internal/edge/model"
)

var pendingBucket = []byte("pending_sessions")

type Store struct {
	db *bolt.DB
}

func Open(path string) (*Store, error) {
	db, err := bolt.Open(path, 0o600, &bolt.Options{Timeout: 2 * time.Second})
	if err != nil {
		return nil, err
	}
	if err := db.Update(func(tx *bolt.Tx) error {
		_, e := tx.CreateBucketIfNotExists(pendingBucket)
		return e
	}); err != nil {
		_ = db.Close()
		return nil, err
	}
	return &Store{db: db}, nil
}

func (s *Store) Close() error { return s.db.Close() }

// Enqueue stores (or replaces) a session keyed by its edge_session_id.
func (s *Store) Enqueue(sess model.EdgeSession) error {
	if sess.EdgeSessionID == "" {
		return fmt.Errorf("edge_session_id required")
	}
	return s.db.Update(func(tx *bolt.Tx) error {
		b, err := json.Marshal(sess)
		if err != nil {
			return err
		}
		return tx.Bucket(pendingBucket).Put([]byte(sess.EdgeSessionID), b)
	})
}

// Pending returns up to limit queued sessions (limit <= 0 returns all).
func (s *Store) Pending(limit int) ([]model.EdgeSession, error) {
	var out []model.EdgeSession
	err := s.db.View(func(tx *bolt.Tx) error {
		c := tx.Bucket(pendingBucket).Cursor()
		for k, v := c.First(); k != nil; k, v = c.Next() {
			var sess model.EdgeSession
			if err := json.Unmarshal(v, &sess); err != nil {
				continue // skip corrupt rows
			}
			out = append(out, sess)
			if limit > 0 && len(out) >= limit {
				break
			}
		}
		return nil
	})
	return out, err
}

// Delete removes the given sessions from the queue (after a successful sync).
func (s *Store) Delete(ids ...string) error {
	if len(ids) == 0 {
		return nil
	}
	return s.db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket(pendingBucket)
		for _, id := range ids {
			if err := b.Delete([]byte(id)); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) Count() (int, error) {
	n := 0
	err := s.db.View(func(tx *bolt.Tx) error {
		n = tx.Bucket(pendingBucket).Stats().KeyN
		return nil
	})
	return n, err
}
