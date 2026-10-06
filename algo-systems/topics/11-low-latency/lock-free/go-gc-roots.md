---
id: ll-go-gc-roots
kind: basic
version: 1
level: 2
tags: [go, gc, memory, concurrency]
requires:
  - ll-go-blocking-basics
refs:
  - https://go.dev/doc/gc-guide
  - https://go.dev/blog/pipelines
---

## Go's GC frees what is unreachable. Why is a goroutine blocked forever on a channel never freed?

---

**A live goroutine's stack is a GC root, and blocked is not dead.** The
runtime keeps every goroutine that has not returned, and everything its
stack references stays reachable with it.

So a goroutine that can never be unblocked is a leak of its stack *and*
of whatever it holds: the GC answers "reachable?", not "still needed?".
