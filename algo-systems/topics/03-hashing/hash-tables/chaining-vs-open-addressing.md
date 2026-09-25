---
id: hash-chaining-vs-open-addressing
kind: basic
version: 1
level: 3
tags: [hashing, memory-hierarchy, containers]
refs:
  - https://abseil.io/about/design/swisstables
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## Chaining vs open addressing: what does each cost per lookup, and why is `std::unordered_map` forced into the slower one?

---

**Chaining** puts colliding keys in a per-bucket linked list. A lookup
reads the bucket array (one miss), then follows a pointer to a node
(another miss), then possibly another. Every node is a separate
allocation, so the nodes are scattered and each step is a dependent load
the prefetcher cannot help with. In exchange it degrades gracefully —
load factor can exceed 1 — deletion is trivial, and **elements never
move**, so pointers and references into the table stay valid.

**Open addressing** stores elements in the table itself and resolves
collisions by probing to another slot. A lookup is usually *one* cache
line: the slot you hashed to, plus its neighbours, which are already in
the line. No per-element allocation, no pointer chasing, and the memory
overhead is the empty slots rather than a pointer per element. The
prices: performance falls off a cliff as the load factor approaches 1,
deletion needs tombstones or backward shifting, and **rehashing moves
every element**, so no reference into the table can be stable.

That last point is the whole story for `std::unordered_map`. The standard
requires reference and pointer stability across rehash and gives you a
bucket interface (`bucket(key)`, `local_iterator`) — together those
*mandate* a node-based chained implementation. A conforming
implementation cannot be a flat table, which is why `absl::flat_hash_map`,
`folly::F14`, `boost::unordered_flat_map` and every game or database
engine's own table exist, and why they are typically 2–3× faster on
lookup-heavy workloads.

Choose chaining when elements are large or must not move, or when the
load factor is genuinely unpredictable. Choose open addressing — which
in practice means Swiss tables — for everything else, and store handles
or indices if you need stable references.
