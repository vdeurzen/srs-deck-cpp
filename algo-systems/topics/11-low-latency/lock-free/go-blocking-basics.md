---
id: ll-go-blocking-basics
kind: cloze
version: 1
level: 1
tags: [go, concurrency, channels]
refs:
  - https://go.dev/ref/spec#Send_statements
  - https://pkg.go.dev/sync#WaitGroup
---

In Go, a send on an unbuffered channel `ch <- v` blocks until
{{c1::a receiver takes the value::another goroutine}}. A
`sync.WaitGroup` is a counter: `Add` raises it, `Done` lowers it, and
`Wait` blocks until {{c2::it reaches zero}}.

---

Both are blocking points, and every Go concurrency bug in this Topic is
one of them never being released: a send nobody receives, a channel
nobody closes, a `Wait` whose counter never reaches zero. A buffered
channel blocks a sender only when its buffer is full.
