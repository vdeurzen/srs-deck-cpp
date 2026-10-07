---
id: trap-go-gc-and-leaks
kind: basic
version: 1
level: 4
tags: [transfer, misconception, go, memory]
elaborate: Which map or slice in your service only ever grows? What removes entries from it, and who would notice if nothing did?
requires:
  - ll-go-gc-roots
refs:
  - https://go.dev/doc/gc-guide
  - https://pkg.go.dev/context
---

## `handle` runs on one goroutine, once per request, for a week. Nothing reads `seen` after a request finishes. What happens to the heap?

```go
var seen = map[string]time.Time{}

func handle(reqID string) {
	seen[reqID] = time.Now()
}
```

---

**It grows without bound: every entry is still reachable from `seen`.**

A GC frees what is unreachable; it cannot know that a reachable entry
is no longer needed. Go leaks are reachability bugs: maps nobody
evicts, goroutines blocked forever, small slices pinning large arrays.
C++'s "who owns this?" becomes "who still references this, and what
drops it?"
