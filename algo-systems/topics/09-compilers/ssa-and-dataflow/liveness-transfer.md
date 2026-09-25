---
id: compiler-liveness-transfer
kind: code
version: 1
level: 5
tags: [compilers, dataflow, bitsets, registers]
input: chips
choices:
  c1:
    - "use | (live_out & ~def)"
    - "(use | live_out) & ~def"
    - "use | (live_out & def)"
    - "use & (live_out | ~def)"
compile:
  harness: |
    // Bit i is variable i.  use = read before written, def = written here.
    static_assert(live_in(0b0011, 0b0100, 0b1100) == 0b1011);
    static_assert(live_in(0b0000, 0b1111, 0b1111) == 0b0000);
    static_assert(live_in(0b1000, 0b0000, 0b0001) == 0b1001);
    // x is read *and then* written in this block: it is live coming in.
    static_assert(live_in(0b0100, 0b0100, 0b0000) == 0b0100);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Live-variable_analysis
  - https://suif.stanford.edu/~courses/cs243/
---

One block's backward transfer function, over a bit vector of
variables. Complete it.

```cpp
constexpr unsigned live_in(unsigned use, unsigned def, unsigned live_out) {
  return {{c1::use | (live_out & ~def)}};
}
```

---

Read it right to left, which is the direction the analysis runs: a
variable is live on entry if the block **reads it before writing it**
(`use`), or if it is live on exit and this block **does not
overwrite** it (`live_out & ~def`). The killed set is subtracted
first, then the generated set is added — the general shape
`out = gen ∪ (in − kill)` that every dataflow analysis instantiates.

The order matters, and the fourth `static_assert` is why. Applying the
kill to `use` as well — `(use | live_out) & ~def` — is wrong for a
variable that is read *and then* written in the same block, like
`x = x + 1`. That variable is genuinely live on entry, and the
incorrect formula reports it dead, so the register allocator happily
gives its register away and the block reads garbage. This is the
classic implementation bug, and it hides until a value happens to be
reused across a block boundary.

Note that `use` and `def` are defined relative to the block's internal
order: `def` holds variables written **before any read** of them here,
which is exactly what makes them "killed". Computing `use`/`def`
correctly by walking the block backwards is half the work.

In production this operates on whole arrays of words — `live_in`,
`use`, `def` and `live_out` are bit vectors with one bit per variable
— so the equation is a few instructions per 64 variables, and the
worklist re-evaluates it per block until the fixpoint. That is the
whole of a liveness pass: this line, a postorder traversal, and a
change flag.
