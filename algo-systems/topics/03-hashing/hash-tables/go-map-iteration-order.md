---
id: hash-go-map-iteration-order
kind: basic
version: 1
level: 2
requires:
  - hash-swiss-table-metadata
tags: [go, hashing]
elaborate: Which test of yours would start failing if your C++ map's iteration order changed between two runs?
refs:
  - https://go.dev/ref/spec#For_range
  - https://go.dev/blog/maps
---

## Ranging twice over the same unchanged Go map can print the keys in two different orders. Why did Go make that happen on purpose?

---

**So code that depends on map order breaks immediately, in tests, not after a runtime upgrade.**

The spec leaves order unspecified; the runtime also randomises each
`range`'s starting point. C++'s order is unspecified but stable within a
run, which lets such bugs hide. For an ordered walk, collect the keys
and sort them.
