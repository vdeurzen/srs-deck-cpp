---
id: trap-hash-vs-tree
kind: basic
version: 1
level: 3
tags: [transfer, misconception, hashing, trees]
elaborate: Pick a map in your codebase. Does anything iterate it, range over it, or depend on its order — and would you notice if the order changed?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://abseil.io/docs/cpp/guides/container
---

## True or false: a hash map's O(1) lookup makes it the right default over an ordered map's O(log n).

---

**Not by itself.** Three things complicate the comparison, and each one
decides real cases.

**The constant.** O(1) is one hash computation plus at least one cache
miss (two for a node-based table like `std::unordered_map`, since the
bucket and the node are separate allocations). O(log n) in a B-tree
over 1000 elements is two node visits, both likely cached, each a
linear scan of contiguous keys. For small and medium n, `absl::btree_map`
or a sorted `vector` routinely beats a hash map — and for n below a
few dozen, a plain linear scan of a `vector` beats everything, because
it is one cache line and no hashing at all.

**The worst case.** A hash map's O(1) is an *average* under a good
hash. With adversarial keys, or a weak hash and a power-of-two mask,
it degrades to a linear scan — a remote denial of service if the keys
come from user input. A balanced tree's O(log n) is a guarantee, which
is why latency-sensitive and security-sensitive code sometimes prefers
one.

**The operations you actually need.** A hash map cannot answer:
ordered iteration, range queries (`WHERE ts BETWEEN a AND b`),
predecessor/successor, "the k smallest", or prefix matching. If you
find yourself sorting the keys after iterating a hash map, you chose
the wrong structure.

The honest default is: **a flat hash map for point lookups on large
collections** (`absl::flat_hash_map`, not `std::unordered_map`, which
the standard forces to be node-based); **a sorted `vector` for small,
build-once-read-many tables**; and **a B-tree or ordered map whenever
order is part of the question**. Reach past the default only with a
measurement.
