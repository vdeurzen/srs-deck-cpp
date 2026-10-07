---
id: chunks-go-worker-pool
kind: chunk
version: 1
level: 3
tags: [idioms, go, concurrency]
expose_ms: 7000
compile: null
requires:
  - ll-go-waitgroup-add
refs:
  - https://pkg.go.dev/sync#WaitGroup.Go
  - https://go.dev/doc/effective_go#channels
---

```go
for range workers {
	wg.Go(func() {
		for job := range jobs {
			results <- process(job)
		}
	})
}
```

---

The Go **worker pool**: a fixed number of goroutines draining one jobs
channel. `wg.Go` (Go 1.25) does the `Add(1)` before the goroutine
starts and the `Done` when it returns — the ordering that hand-written
`wg.Add(1); go func() { defer wg.Done(); … }()` must get right.
`for range jobs` ends each worker when the producer closes `jobs`.

Not compile-checked: the compile service builds C++, so this Go
snippet is graded by whitespace-normalised equality. It was built and
vetted with Go 1.27.
