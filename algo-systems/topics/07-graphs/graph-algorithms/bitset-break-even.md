---
id: graph-bitset-break-even
kind: basic
version: 1
level: 4
tags: [graphs, bitsets, compilers, memory]
requires:
  - graph-bitset-graphs
refs:
  - https://llvm.org/docs/ProgrammersManual.html#sparsebitvector
  - https://dl.acm.org/doi/10.1145/176454.176484
---

## A per-block set ranges over 1 000 000 virtual registers but usually holds about 20. Why is a plain bit vector the wrong choice?

---

**Its cost tracks the universe, not the members: 15 625 words per operation.**

A bit vector is n/8 bytes (125 KB here) and O(n/64) per union, however
empty. Sparse sets want a sparse representation: LLVM's
`SparseBitVector` keeps only non-zero 128-bit chunks, and the
Briggs–Torczon sparse set gives O(1) insert, test and clear.
