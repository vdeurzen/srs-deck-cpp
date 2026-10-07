---
id: compiler-available-expressions
kind: code
version: 1
level: 5
tags: [compilers, dataflow, bitsets]
input: chips
choices:
  c1: ["&=", "|=", "=", "^="]
compile:
  harness: |
    // Bit e: expression e is available. Blocks not yet processed hold ~0u.
    constexpr unsigned kOut[] = {0b0110, 0b0011, ~0u, 0b1111};
    static_assert(avail_in(kOut, 0b0001, false) == 0b0110);   // one predecessor
    static_assert(avail_in(kOut, 0b0011, false) == 0b0010);   // two that disagree
    static_assert(avail_in(kOut, 0b1100, false) == 0b1111);   // one still unprocessed
    static_assert(avail_in(kOut, 0b0001, true) == 0);         // the entry
    int main() {}
requires:
  - compiler-dataflow-quadrants
  - compiler-liveness-transfer
refs:
  - https://suif.stanford.edu/~courses/cs243/
  - https://en.wikipedia.org/wiki/Available_expression
elaborate: Liveness starts every set empty. Why would starting available expressions empty give a correct but useless answer?
---

Available expressions: an expression is available on entry to a block
only if every predecessor makes it available. Complete how each
predecessor's output folds in.

```cpp
constexpr unsigned avail_in(const unsigned* avail_out, unsigned preds, bool entry) {
  if (entry) return 0;                     // nothing computed yet
  unsigned in = ~0u;
  for (int p = 0; p < 32; ++p)
    if (preds >> p & 1) in {{c1::&=}} avail_out[p];
  return in;
}
```

---

**Intersect: keep only what every predecessor provides.** Unioning
makes an expression available if *one* path computed it, so a use on
the other path would read a value never produced; plain assignment
trusts the last predecessor alone. Intersection's identity is all ones,
which is why the fold, and every unprocessed block, starts at `~0u`: a
must analysis starts optimistic and narrows. Only the entry is pinned
to empty.
