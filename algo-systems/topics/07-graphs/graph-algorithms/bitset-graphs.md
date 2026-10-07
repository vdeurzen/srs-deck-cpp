---
id: graph-bitset-graphs
kind: basic
version: 1
level: 4
tags: [graphs, bitsets, compilers, simd]
requires:
  - graph-representations
refs:
  - https://en.cppreference.com/w/cpp/utility/bitset
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
---

## Why do compiler analyses represent sets of blocks, variables and registers as bit vectors?

---

**Set union and difference become word-wide OR and AND-NOT: 64 members per instruction.**

Liveness is `in = use ∪ (out − def)` per block. Over 1000 variables
that is 16 words: 16 branch-free operations the compiler vectorises,
where a hash set would do 1000 lookups. Reaching definitions, dominator
sets and interference rows have the same shape.
