---
id: seq-go-subslice-capacity
kind: basic
version: 1
level: 3
tags: [go, slices, aliasing]
requires:
  - seq-go-slice-aliasing
refs:
  - https://go.dev/ref/spec#Slice_expressions
  - https://go.dev/blog/slices-intro
---

## `log` holds 20 entries. A helper takes `head := log[:10]` and does `head = append(head, e)`. What happens to `log`?

---

**`log[10]` is overwritten with `e`.** `log[:10]` keeps the whole
capacity of `log`, so `append` finds room and writes in place: no copy,
no error. A full slice expression `log[0:10:10]` caps the capacity and
forces the append to allocate.
