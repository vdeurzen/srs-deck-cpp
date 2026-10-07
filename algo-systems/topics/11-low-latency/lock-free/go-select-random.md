---
id: ll-go-select-random
kind: basic
version: 1
level: 3
tags: [go, concurrency, channels]
requires:
  - ll-go-blocking-basics
refs:
  - https://go.dev/ref/spec#Select_statements
---

## A `select` lists `case c := <-control:` first and `case m := <-data:` second. Both channels are ready. Which case runs?

---

**Either: Go picks among ready cases uniformly at random.** Source order
means nothing (the spec says "uniform pseudo-random selection"), which
prevents starvation. To prefer `control`, test it first in its own
`select` with a `default`, then fall through to the two-case `select`.
