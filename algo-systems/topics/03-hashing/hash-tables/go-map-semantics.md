---
id: hash-go-map-semantics
kind: basic
version: 1
level: 3
requires:
  - hash-chaining-vs-open-addressing
tags: [go, hashing, containers]
elaborate: Which of these three properties would break code you have written in C++ if `unordered_map` adopted it tomorrow?
refs:
  - https://go.dev/blog/maps
  - https://go.dev/ref/spec#Map_types
  - https://go.dev/blog/swisstable
---

## Three things Go's built-in `map` does that `std::unordered_map` does not. What are they, and what is each for?

---

**1. You cannot take the address of an element.** `&m[k]` does not
compile, and `m[k].field = v` is rejected for a struct value type. The
map is free to move entries during growth, so Go removes the pointer
rather than promising stability. The idiomatic answers are to store
`map[K]*V` (the pointer is yours, the map only moves the pointer) or to
read, modify and write back the whole value.

**2. Iteration order is randomised, deliberately.** Not merely
unspecified — the runtime starts each `range` at a random bucket, so a
program that accidentally depends on order fails quickly and locally
rather than in production after a release changes the hash. The C++
container's order is also unspecified, but it is stable within a run,
which is exactly the property that lets bugs hide. To iterate in order
in Go you collect the keys and sort them.

**3. Growth is bounded per insert.** Rather than rehashing everything on
one unlucky insert, the map is split into independent tables of at most
1024 entries (extendible hashing, since Go 1.24); a table that fills is
grown or split on its own, so the worst insert copies 1024 entries, not
the whole map. (Before 1.24 the map grew incrementally, evacuating a
couple of old buckets per write.) The worst-case insert stays bounded — the same trade a latency-sensitive C++ table has
to make by hand, usually by reserving up front.

Two more differences worth holding: reading a missing key returns the
zero value rather than inserting one (`m[k]` never grows the map;
`m[k]++` does, via the assignment), and the comma-ok form `v, ok := m[k]`
is how you tell "absent" from "present and zero" — the distinction
`find() != end()` makes in C++. Concurrent access is unprotected and
*checked*, best-effort: the runtime usually detects concurrent map
writes and aborts the process, which is friendlier than C++'s undefined behaviour.

Under the hood, Go 1.24 replaced the historical bucket-of-8-with-tophash
layout with Swiss tables, so the two languages' default maps now differ
more in semantics than in structure.
