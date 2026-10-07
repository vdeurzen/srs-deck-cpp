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
requires:
  - compiler-liveness
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

**Kill first, then add the uses**: live on entry if read before written
here (`use`), or live on exit and not overwritten (`live_out & ~def`).
That is `out = gen ∪ (in − kill)`, the shape every gen/kill bit-vector
analysis instantiates.

The fourth `static_assert` is the trap. `def` holds **every** variable
the block writes, so `x = x + 1` puts `x` in both `use` and `def`.
`(use | live_out) & ~def` then reports `x` dead on entry, and the
allocator gives its register away: the classic bug.
