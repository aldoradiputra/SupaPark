BINARY := supapark-edge
PKG := ./cmd/edge
LDFLAGS := -s -w

.PHONY: build build-arm64 build-arm test vet tidy run clean

## build: native build (current host)
build:
	go build -o $(BINARY) $(PKG)

## build-arm64: Raspberry Pi 3/4/5 on a 64-bit OS (most common)
build-arm64:
	GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -ldflags "$(LDFLAGS)" -o $(BINARY)-arm64 $(PKG)

## build-arm: Raspberry Pi 2/3 / 32-bit OS (ARMv7)
build-arm:
	GOOS=linux GOARCH=arm GOARM=7 CGO_ENABLED=0 go build -ldflags "$(LDFLAGS)" -o $(BINARY)-armv7 $(PKG)

test:
	go test ./...

vet:
	go vet ./...

tidy:
	go mod tidy

## run: run locally (needs the EDGE_* env vars, e.g. `set -a; . ./.env; set +a; make run`)
run:
	go run $(PKG)

clean:
	rm -f $(BINARY) $(BINARY)-arm64 $(BINARY)-armv7
