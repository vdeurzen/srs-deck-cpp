---
id: heap-d-ary
kind: basic
version: 1
level: 4
tags: [heaps, memory-hierarchy, graphs]
refs:
  - https://en.wikipedia.org/wiki/D-ary_heap
  - https://en.wikipedia.org/wiki/Fibonacci_heap
---

## When is a 4-ary heap faster than a binary one, and what do Fibonacci heaps actually buy?

---

A d-ary heap has depth log_d n, so **sift-up gets cheaper** (fewer
levels, one comparison per level) and **sift-down gets more expensive**
(d−1 comparisons per level to find the largest child). Push is
`O(log_d n)`, pop is `O(d·log_d n)`.

So the answer depends on the mix. Dijkstra and A* push far more than
they pop — most pushes are decrease-key-ish updates that are never
extracted — so d = 4 or 8 typically wins. The cache argument points the
same way: with d = 4 and 8-byte entries, four siblings occupy half a
cache line, so a sift-down level costs *one* miss and four comparisons
instead of one miss and one comparison. Measured on large heaps, 4-ary
is commonly 1.5–2× faster than binary despite doing more comparisons.

**Fibonacci heaps** attack a different axis: `decrease_key` in O(1)
amortised, which drops Dijkstra's bound from O((V+E) log V) to
O(E + V log V) — asymptotically better on dense graphs. In practice they
are famously slower than a 4-ary array heap: each node is a separately
allocated object in a circular doubly-linked list of trees, so every
operation is pointer chasing, the constants are large, and the amortised
bound means consolidations arrive in bursts.

The engineering answer for shortest paths is usually neither: use a
flat d-ary heap and **lazy deletion** (push a new entry, skip stale pops)
instead of decrease-key, or — when edge weights are small integers — a
bucket queue / radix heap, which is O(1) per operation and beats both.

Pairing heaps sit in between: much simpler than Fibonacci, decrease-key
that is fast in practice, and the usual choice when you genuinely need
the operation (some IR schedulers and network simulators do).
