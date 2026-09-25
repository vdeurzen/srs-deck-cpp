---
id: graph-bitset-graphs
kind: basic
version: 1
level: 4
tags: [graphs, bitsets, compilers, simd]
refs:
  - https://en.cppreference.com/w/cpp/utility/bitset
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
---

## Why do compiler analyses represent sets of blocks, variables and registers as bit vectors, and what is the break-even?

---

Because the operations they need are exactly the ones a machine word
does 64 at a time. A liveness analysis is `live_in = use ∪ (live_out −
def)` per block; with bit vectors that is an OR and an AND-NOT over
`⌈n/64⌉ words`, vectorised by the compiler into AVX operations, with no
branches and perfect locality. The same for reaching definitions,
available expressions, dominator sets, register interference rows, and
alias sets.

The cost model is different from a hash set's: a bit vector is O(n/64)
per operation regardless of how many elements are *in* it, and n/64
bytes of memory regardless of occupancy. So:

- **Dense sets, small universe** → bit vector wins outright. 1000
  variables is 16 words; unioning two such sets is 16 instructions where
  a hash set would be 1000 lookups.
- **Sparse sets, large universe** → the bit vector wastes both memory
  and time scanning zeros. The usual fixes are a **sparse bit set**
  (a list of (index, word) pairs — LLVM's `SparseBitVector`), a
  **sparse set** (the O(1)-clear dense/sparse array pair, ideal for
  per-block scratch sets), or a **hybrid** that starts sparse and
  switches.

Two idioms make bit vectors pleasant to work with. Iterate set bits
with `while (w) { int i = std::countr_zero(w); w &= w - 1; … }` — one
instruction to find the next bit, one to clear it, no branch per
candidate. And answer "did anything change?" — the question every
fixpoint loop asks — by comparing words rather than elements, or by
ORing into the old value and testing whether the result differs.

The database cousin of all this is the bitmap index, with the same
sparse/dense problem and a more elaborate answer: Roaring bitmaps,
which choose a container type per 2¹⁶ chunk of the universe.
