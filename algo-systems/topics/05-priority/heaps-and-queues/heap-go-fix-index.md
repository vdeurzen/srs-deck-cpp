---
id: heap-go-fix-index
kind: code
version: 1
level: 3
requires:
  - heap-go-container-heap
  - heap-decrease-key-handle
tags: [go, heaps, interfaces]
input: chips
compile: null
choices:
  c1:
    - "q[i].idx, q[j].idx = i, j"
    - "q[i].idx, q[j].idx = j, i"
    - "q[i].idx = i"
    - "q[j].idx, q[i].idx = i, j"
refs:
  - https://pkg.go.dev/container/heap#Fix
  - https://pkg.go.dev/container/heap#example-package-PriorityQueue
---

A Go order queue must reprice a resting order with `heap.Fix(&q, o.idx)`.
Complete `Swap` so every order always knows its own slot.

```go
type Order struct{ px float64; idx int }
type Queue []*Order

func (q Queue) Len() int           { return len(q) }
func (q Queue) Less(i, j int) bool { return q[i].px > q[j].px }
func (q Queue) Swap(i, j int) {
    q[i], q[j] = q[j], q[i]
    {{c1::q[i].idx, q[j].idx = i, j}}
}
```

---

After the element swap, `q[i]` is the order that just arrived at slot
`i`, so it records `i`; likewise `j`. `heap.Fix(h, i)` then re-sifts in
O(log n), the same work as `heap.Remove` plus `heap.Push` but cheaper —
and it is only correct if `i` is that order's current slot. Updating one
side leaves the other order's `idx` stale; crossing the indices
(either spelling) writes each order the slot it just *left*.

`Push` must also set `idx = len(*q)` before appending. This is the
package's own `PriorityQueue` example. Not compile-checked: the Deck's
compile service builds C++, so Go is graded by whitespace-normalised
equality.
