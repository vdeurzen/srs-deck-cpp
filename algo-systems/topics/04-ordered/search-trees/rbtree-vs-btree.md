---
id: ordered-rbtree-vs-btree
kind: basic
version: 1
level: 3
requires:
  - ordered-why-balance
  - foundations-cache-cost-model
tags: [trees, memory-hierarchy, databases]
refs:
  - https://en.cppreference.com/w/cpp/container/map
  - https://abseil.io/docs/cpp/guides/container
---

## Both are O(log n). Why does a B-tree beat a red-black tree in memory, and by how much?

---

Because the base of the logarithm is the number of *cache misses*, and
they differ.

A red-black tree allocates one node per element: two child pointers, a
parent pointer, a colour, and the element — 40+ bytes for a 16-byte
entry, scattered wherever the allocator put them. A lookup in a tree of
a million elements is ~20 dependent pointer hops, and each is a likely
cache miss because the nodes have no spatial relationship. Each miss
loads 64 bytes to use about 16 of them.

A B-tree of the same million elements, with nodes sized to a few cache
lines (say 256 bytes holding ~30 keys), has depth 4–5. Each node visit
reads keys that are *contiguous*, so one or two lines answer 30
comparisons, and a linear or SIMD scan within the node is faster in
practice than the binary search its size would suggest. Roughly 20
misses become 4 or 5, plus far less memory overhead: children are implied by
the node array rather than by a pointer per element.

`absl::btree_map` is exactly this as a drop-in-ish replacement for
`std::map`, typically using several times less memory and being
markedly faster to look up and iterate. What it gives up is
`std::map`'s **pointer and reference stability**: a B-tree moves
elements when nodes split and merge, so a pointer into it is only valid
until the next insert. That is the same trade flat hash tables make.

On disk the argument is identical with different numbers: `B` is a 4–16
KiB page instead of a cache line, the fanout is in the hundreds, and the
depth of a billion-key index is 4. A red-black tree in that setting
would be ~30 page reads per lookup, which is why no storage engine has
ever used one for an index.
