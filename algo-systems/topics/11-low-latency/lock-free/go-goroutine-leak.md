---
id: ll-go-goroutine-leak
kind: code
version: 1
level: 3
tags: [go, concurrency, channels, memory]
requires:
  - ll-go-gc-roots
input: chips
choices:
  c1: ["make(chan string, len(urls))", "make(chan string)", "make(chan string, 1)"]
compile: null
refs:
  - https://go.dev/blog/pipelines
  - https://go.dev/ref/spec#Channel_types
---

Return the first response without leaking the goroutines that lose the
race. Complete the channel.

```go
func first(urls []string) string {
	ch := {{c1::make(chan string, len(urls))}}
	for _, u := range urls {
		go func() { ch <- fetch(u) }()
	}
	return <-ch
}
```

---

**One buffer slot per sender**, so every send completes even though
only one value is ever received. Unbuffered, the losers block on their
send forever — with four URLs, three goroutines leak per call (measured
with `runtime.NumGoroutine` under Go 1.27.1). A buffer of 1 still leaks n − 2.

The other cure is a `select` on `ctx.Done()` around the send, cancelled
when `first` returns.

Not compile-checked: Go Cards are graded by whitespace-normalised
equality (SPEC §4.5).
