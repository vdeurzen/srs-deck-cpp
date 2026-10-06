---
id: ll-go-waitgroup-add
kind: basic
version: 1
level: 2
tags: [go, concurrency]
requires:
  - ll-go-blocking-basics
refs:
  - https://pkg.go.dev/sync#WaitGroup
  - https://go.dev/ref/mem
---

## Why must `wg.Add(1)` run before `go work()`, not as the goroutine's first line?

---

```go
wg.Add(1)                          // here, in the spawning goroutine
go func() { defer wg.Done(); work() }()
wg.Wait()
```

**Otherwise `Wait` can run first, see a zero counter and return before
the work starts.** Nothing orders the new goroutine's first line before
the spawner's `Wait`. Since Go 1.25, `wg.Go(work)` does the `Add`, the
`go` and the `Done` in one call.
