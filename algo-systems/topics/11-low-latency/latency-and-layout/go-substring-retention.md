---
id: ll-go-substring-retention
kind: code
version: 1
level: 3
tags: [go, gc, memory, slices]
requires:
  - ll-go-gc-roots
input: chips
choices:
  c1: ["bytes.Clone(resp[:16])", "resp[:16]", "resp[:16:16]", "append(resp[:0], resp[:16]...)"]
compile: null
refs:
  - https://pkg.go.dev/bytes#Clone
  - https://go.dev/blog/slices-intro
---

`resp` is a 1 MB response body; its first 16 bytes are an ID that goes
into a long-lived map. Complete the return so the map does not keep the
megabyte alive.

```go
func requestID(resp []byte) []byte {
	return {{c1::bytes.Clone(resp[:16])}}
}
```

---

**Copy the small piece.** Any slice of `resp` points into the same
backing array, and the GC keeps the *whole* array alive while any slice
of it is reachable. `resp[:16:16]` caps the capacity but still points
into the megabyte; `append(resp[:0], …)` writes into it.

`bytes.Clone` (Go 1.20) allocates 16 fresh bytes. `strings.Clone` is the
same fix for a substring.

Not compile-checked: Go Cards are graded by whitespace-normalised
equality (SPEC §4.5).
