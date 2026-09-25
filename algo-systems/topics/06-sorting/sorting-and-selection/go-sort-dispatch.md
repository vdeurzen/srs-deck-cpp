---
id: sort-go-dispatch
kind: basic
version: 1
level: 3
tags: [go, sorting, generics]
elaborate: In your own Go code, where would switching from `sort.Slice` to `slices.SortFunc` change a profile — and where would it change nothing?
refs:
  - https://pkg.go.dev/slices#SortFunc
  - https://pkg.go.dev/sort#Slice
---

## Go has `sort.Sort`, `sort.Slice` and `slices.SortFunc`. What does each cost per comparison, and why did the answer change in 1.18 and 1.21?

---

All three run the same algorithm — pdqsort since Go 1.19 — and differ
entirely in **how the comparison and the swap get called**.

- **`sort.Sort(data Interface)`**: `Less` and `Swap` are interface
  method calls. One indirect call per comparison, unlikely to be
  inlined, plus the cost of your slice type's method wrappers.
- **`sort.Slice(x any, less func(i, j int) bool)`**: worse. The slice
  arrives as `any`, so the package uses **reflection** to build the
  swapper (`reflect.Swapper`), and `less` is a closure called
  indirectly. Convenient, and the slowest of the three.
- **`slices.SortFunc(x []T, cmp func(a, b T) int)`** (Go 1.21, on top
  of generics from 1.18): the sort is instantiated for the element type,
  swaps are direct memory moves of a known size, and the comparison is a
  `func` value — still an indirect call, but the surrounding machinery is
  monomorphic. `slices.Sort(x)` for ordered types is faster again, since
  the comparison is `<` and inlines.

Measured on a few million ints, the spread between `sort.Slice` and
`slices.Sort` is typically 2–3×, which is entirely dispatch and
reflection overhead, not algorithm.

The C++ contrast is instructive: `std::sort` takes the comparator as a
*type*, so a lambda is a distinct type with an inlinable
`operator()` — zero dispatch cost, at the price of instantiating the
sort per comparator. Passing `std::function<bool(T,T)>` instead
reproduces exactly Go's indirect-call cost, which is a good way to
remember that this is a property of the *dispatch mechanism*, not of the
language.

The practical rule for Go: use `slices.Sort`/`slices.SortFunc` for new
code, keep `sort.Sort` where you need a custom `Swap` (index-tracking
heaps, parallel arrays), and treat `sort.Slice` in a hot path as a
finding.
