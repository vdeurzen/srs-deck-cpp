---
id: chunks-go-worker-pool
kind: chunk
version: 1
level: 3
tags: [idioms, go, concurrency]
expose_ms: 8000
compile: null
requires:
  - ll-go-waitgroup-add
  - ll-go-close-by-sender
refs:
  - https://go.dev/doc/effective_go#channels
  - https://pkg.go.dev/sync#WaitGroup
---

```go
var wg sync.WaitGroup
for i := 0; i < workers; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        for job := range jobs {
            results <- process(job)
        }
    }()
}
go func() { wg.Wait(); close(results) }()
```

---

The Go worker pool, in the shape that does not leak. Four details carry
it: `wg.Add` **before** the goroutine starts (adding inside the
goroutine races with `Wait`); `defer wg.Done()` so a panic still
releases the counter; `for range jobs` so each worker exits when the
producer closes `jobs`; and the closing goroutine, which waits for all
the workers and only then closes `results`, because closing it from a
worker would panic the others.

The consumer then simply ranges over `results` until it is closed,
which is how the whole pipeline terminates without any explicit
signalling.

Two extensions worth knowing: pass a `context.Context` and select on
`ctx.Done()` inside the loop to make cancellation work, or use
`errgroup.Group`, which bundles the WaitGroup, the error propagation
and the context cancellation together.

This Card is not compile-checked: the Deck's compile service builds
C++ (SPEC §9), so Go snippets are graded by whitespace-normalised
equality (SPEC §4.7).
