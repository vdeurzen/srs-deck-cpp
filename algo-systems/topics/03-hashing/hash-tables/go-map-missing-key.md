---
id: hash-go-map-missing-key
kind: basic
version: 1
level: 2
requires:
  - cpp-core/containers-map-subscript-inserts
tags: [go, hashing, containers]
elaborate: In your C++, which `m[k]` reads would you turn into `find` or `contains` if you were porting them from Go?
refs:
  - https://go.dev/ref/spec#Index_expressions
  - https://go.dev/blog/maps
---

## `v := stock["pear"]` on a Go map without `"pear"`. How many entries does `stock` hold afterwards, compared with C++'s `stock["pear"]`?

---

**Go's map is unchanged; C++'s `operator[]` inserts `"pear"`.**

A Go index read returns the zero value and never grows the map (only an
assignment such as `stock["pear"]++` does). To tell absent from zero,
use the comma-ok form, `v, ok := stock["pear"]`: Go's `find() != end()`.
