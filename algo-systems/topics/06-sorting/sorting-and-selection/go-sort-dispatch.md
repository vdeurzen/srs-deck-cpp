---
id: sort-go-dispatch
kind: basic
version: 2
level: 3
tags: [go, sorting, generics]
elaborate: In your own Go code, where would switching from `sort.Slice` to `slices.Sort` change a profile — and where would it change nothing?
requires:
  - cpp-core/staticpoly-static-vs-dynamic
refs:
  - https://pkg.go.dev/slices#Sort
  - https://pkg.go.dev/sort#Slice
  - https://go.dev/src/sort/zsortinterface.go
---

## Go's `sort.Sort`, `sort.Slice` and `slices.SortFunc` all run pdqsort. What does each pay per comparison that `slices.Sort` on `[]int` does not?

---

**An indirect call: an interface method, a closure, or a `func` value; `slices.Sort` inlines `<`.**

Go 1.27.1, 2²⁰ random ints, mean of 3 runs (amd64): `slices.Sort` ~98 ms,
`sort.Sort` ~108, `sort.Slice` ~117, `slices.SortFunc` ~146. Same
algorithm, so the whole spread is dispatch.
