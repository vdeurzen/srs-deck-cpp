---
id: transfer-slices-vs-span
kind: basic
version: 1
level: 3
tags: [transfer, misconception, ownership]
elaborate: How does Go's garbage collector make a slice's backing array safe to keep around, in a way `std::span` never is?
requires:
  - ranges-views-lazy-cloze
refs:
  - https://en.cppreference.com/w/cpp/container/span
---

## True or false: `std::span<T>` works like a Go slice — you can `append`-grow it, and holding onto the span keeps its data alive.

---

**False.** A Go slice is a `(pointer, length, capacity)` triple over a
backing array the garbage collector keeps alive for as long as any slice
still references it, and `append` can grow it, reallocating a fresh
backing array when capacity runs out. `std::span<T>` is only a
`(pointer, length)` **view** — it owns nothing, has no capacity and no
`append`, and keeps nothing alive. If the container it was taken from is
destroyed, reallocates (a `push_back` past capacity on the `vector` it
points into, say), or even just goes out of scope, the `span` silently
starts pointing at freed memory. A `span` is only ever as valid as
whatever it was formed from is guaranteed to still be alive.
