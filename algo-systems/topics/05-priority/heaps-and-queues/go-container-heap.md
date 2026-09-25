---
id: heap-go-container-heap
kind: basic
version: 1
level: 3
tags: [go, heaps, interfaces]
elaborate: Which of the two designs would you rather debug at 3 a.m., and which would you rather see in a profile?
refs:
  - https://pkg.go.dev/container/heap
  - https://en.cppreference.com/w/cpp/container/priority_queue
---

## Go's `container/heap` and C++'s `std::priority_queue` solve the same problem with opposite dispatch. What does each design cost?

---

**Go inverts the ownership.** You implement `heap.Interface` — `Len`,
`Less`, `Swap`, `Push`, `Pop` — on your own slice type, and the package
supplies the algorithms (`heap.Init`, `heap.Push`, `heap.Pop`,
`heap.Fix`). The data stays yours, in your slice, with your layout.

```go
type PQ []*Order
func (p PQ) Len() int            { return len(p) }
func (p PQ) Less(i, j int) bool  { return p[i].px > p[j].px }
func (p PQ) Swap(i, j int)       { p[i], p[j] = p[j], p[i]; p[i].idx = i; p[j].idx = j }
func (p *PQ) Push(x any)         { *p = append(*p, x.(*Order)) }
func (p *PQ) Pop() any           { old := *p; n := len(old); it := old[n-1]; *p = old[:n-1]; return it }
```

**C++ inverts the other way.** `std::priority_queue<T, Container, Cmp>`
owns the container and takes the comparator as a *type* parameter, so
the comparison is inlined and the whole thing monomorphises to the same
code a hand-written heap would produce.

The trade is dispatch cost against flexibility:

- Go's calls go through an interface, so each comparison and swap is an
  indirect call the compiler usually cannot inline. For a hot heap that
  is a measurable tax — and the reason performance-sensitive Go code
  hand-rolls type-specific heaps (or, since generics, writes one
  generic heap over `[]T` with a `func(a, b T) bool`).
- Go's design gives you something C++'s does not: because `Swap` is
  yours, you can **maintain each element's index** as it moves (the
  `p[i].idx = i` above) — which is exactly the handle that makes a real
  `heap.Fix` (decrease-key) possible. `std::priority_queue` has no such
  hook, which is why C++ Dijkstra uses lazy deletion instead.

So the languages land in different places for the same algorithm: Go
pays per comparison and gets decrease-key; C++ inlines the comparison
and works around the missing operation.
