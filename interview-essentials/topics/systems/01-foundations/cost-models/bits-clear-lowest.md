---
id: foundations-bits-clear-lowest
kind: basic
version: 1
level: 2
tags: [bit-tricks]
requires:
  - foundations-bitwise-operators
elaborate: Say in one sentence, as to an interviewer, how repeating this step counts the set bits of a mask, and how many times the loop runs.
refs:
  - https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic
---

## For an unsigned `x`, why does `x & (x - 1)` drop exactly the lowest set bit and keep every other bit?

```
x           = 0101 0100
x - 1       = 0101 0011
x & (x - 1) = 0101 0000
```

---

**Subtracting 1 flips the lowest set bit and the zeros below it; nothing above changes.**

The 1 is borrowed from the lowest set bit, which becomes 0, and the
zeros below it become 1s. The AND keeps the unchanged bits above and
clears that flipped run.
