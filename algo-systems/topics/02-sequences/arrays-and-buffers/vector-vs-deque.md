---
id: seq-vector-vs-deque
kind: basic
version: 1
level: 2
requires:
  - foundations-cache-cost-model
  - seq-array-vs-list-index
tags: [containers, memory-hierarchy]
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container/vector
---

## What does `std::deque` actually give you over `std::vector`, and what does it cost on a scan?

---

A `deque` is a **map of fixed-size chunks**: an array of pointers to
blocks (512 bytes' worth of elements in libstdc++), with the first and
last block partly filled. That layout buys three things `vector` cannot:

- **O(1) `push_front`** as well as `push_back`.
- **No reallocation of the elements**: growing a `deque` allocates one
  new block and possibly reallocates the *pointer map*, so pointers and
  references to existing elements stay valid across `push_back` and
  `push_front` — a genuinely useful guarantee that `vector` lacks.
- **Bounded element work per push**: a `vector`'s occasional O(n) move
  of every element becomes one block allocation plus, rarely, a copy of
  the pointer map — `n / block` pointers, not `n` elements, which matters when
  the requirement is a latency percentile rather than a throughput
  average.

The cost shows up on iteration and on indexing. Element access is
`map[i / block][i % block]` — an extra indirection and a division that
becomes a shift only when the elements per block are a power of two
(libstdc++'s 512 / `sizeof(T)` often is not: 21 for a 24-byte `T`) — and a scan crosses a block boundary every
few dozen elements, so the hardware prefetcher restarts and the compiler
struggles to vectorise. On a pure traversal a `vector` is usually
several times faster.

The practical rule: `vector` by default; `deque` when you need a queue
with growth, stable references, or a bounded per-operation cost; a fixed
**ring buffer** when the queue has a known bound, because then you get
`deque`'s worst case *and* `vector`'s locality, with no allocation at
all.

Note that `deque`'s iterators are invalidated by `push_front`/`push_back`
even though references are not — the two guarantees are separate, and
mixing them up is a common source of bugs.
