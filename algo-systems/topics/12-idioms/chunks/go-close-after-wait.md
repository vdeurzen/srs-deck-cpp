---
id: chunks-go-close-after-wait
kind: chunk
version: 1
level: 3
tags: [idioms, go, concurrency]
expose_ms: 6000
compile: null
requires:
  - chunks-go-worker-pool
  - ll-go-close-by-sender
refs:
  - https://go.dev/blog/pipelines
  - https://pkg.go.dev/sync#WaitGroup.Wait
---

```go
go func() {
	wg.Wait()
	close(results)
}()
for r := range results {
	collect(r)
}
```

---

**Fan-in shutdown**: one goroutine waits for every worker, *then*
closes `results`; the consumer ranges until that close. A worker
closing `results` itself would make the other workers' sends panic, and
calling `wg.Wait()` on the consumer's goroutine before ranging would
deadlock, since workers block on sends nobody reads.

Not compile-checked: the compile service builds C++, so this Go
snippet is graded by whitespace-normalised equality. It was built and
vetted with Go 1.27.
