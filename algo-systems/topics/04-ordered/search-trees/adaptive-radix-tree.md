---
id: ordered-adaptive-radix-tree
kind: basic
version: 1
level: 5
requires:
  - ordered-radix-trie
tags: [tries, databases, memory-hierarchy]
refs:
  - https://db.in.tum.de/~leis/papers/ART.pdf
  - https://en.wikipedia.org/wiki/Adaptive_radix_tree
---

## What are ART's four node types, and what problem does switching between them solve?

---

The problem is that a radix tree's fanout is fixed by the alphabet
(256 for a byte-wise trie) but its *actual* fanout varies enormously:
the root of a tree of sequential integers is dense, while a node deep
inside a sparse key space has two children. A fixed 256-entry child
array wastes 2 KB per node in the sparse case; a fixed small array
costs a search in the dense case.

ART sizes the node to its occupancy and **upgrades or downgrades in
place** as children are added or removed:

- **Node4** — two parallel arrays of up to 4 keys and 4 child pointers;
  linear scan.
- **Node16** — the same up to 16, comparable with one SIMD instruction.
- **Node48** — a 256-byte index mapping a key byte to one of 48 child
  slots; one indexed load instead of a search.
- **Node256** — the plain 256-pointer array; direct indexing, used when
  the node is dense.

Two more compressions matter as much as the node types. **Path
compression** collapses single-child chains, and **lazy expansion**
stops at the point where a key becomes unique rather than walking it to
the end — together they make the height depend on the keys' shared
structure rather than their length.

The result is an ordered index with hash-table-like point-lookup
performance and a memory footprint comparable to a B-tree's, which is
why it is used as a main-memory index in HyPer, DuckDB and several
key-value stores. Its distinctive properties are worth naming: no
rebalancing (so the structure depends only on the keys, not the
insertion order), and keys must be turned into order-preserving byte
strings first — big-endian integers, sign-flipped for signedness, which
is the same transformation a column store applies before sorting.
