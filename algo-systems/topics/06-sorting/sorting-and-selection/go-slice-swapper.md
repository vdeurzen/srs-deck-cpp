---
id: sort-go-slice-swapper
kind: basic
version: 1
level: 4
tags: [go, sorting, reflection]
requires:
  - sort-go-dispatch
elaborate: Before replacing a `sort.Slice` with `slices.SortFunc` in your code, what would you check about the element type?
refs:
  - https://go.dev/src/internal/reflectlite/swapper.go
  - https://pkg.go.dev/slices#SortFunc
---

## Go 1.27.1, 2²⁰ elements. On `[]int`, `sort.Slice` (~117 ms) beats generic `slices.SortFunc` (~146 ms). On a 32-byte struct it loses, ~199 ms to ~116 ms. What flips it?

---

**`sort.Slice`'s reflection-built swapper: a typed swap for 8-byte elements, three `typedmemmove` calls otherwise.**

`reflectlite.Swapper` fast-paths element sizes 1, 2, 4 and 8, so for
`[]int` each swap is cheap. Wider elements take the generic copy path,
while `SortFunc`'s instantiation moves them directly. "Generic is
faster" depends on the element.
