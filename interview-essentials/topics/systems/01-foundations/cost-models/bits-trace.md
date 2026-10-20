---
id: foundations-bits-trace
kind: trace
version: 2
level: 2
tags: [bit-tricks, tracing]
requires:
  - foundations-bits-lowest-set-bit
  - foundations-bits-clear-lowest
elaborate: What would break in the counting loop if `x` were a signed int holding a negative value?
probes:
  1: { low: "8" }
  2: { rest: "96" }
  3: { k: "3", x: "0" }
refs:
  - https://graphics.stanford.edu/~seander/bithacks.html
  - https://en.cppreference.com/w/cpp/numeric/popcount
---

Work each value out by hand from the bits of `x`, and give it in decimal. The apostrophe in `0b0110'1000` only makes the number readable.

```cpp
int main() {
  unsigned x = 0b0110'1000;                      // 104
  unsigned low  = x & -x;                        // @1
  unsigned rest = x & (x - 1);                   // @2
  int k = 0;
  while (x != 0) { x &= x - 1; ++k; }            // @3
}
```

---

The bit tricks every bitset loop is built from:

- `x & -x` **isolates** the lowest set bit: `0000 1000` = 8.
- `x & (x − 1)` **clears** it: subtracting 1 flips that bit and the zeros
  below it, so the AND drops them — `0110 0000` = 96.
- Repeating the clear **counts** set bits: the loop at @3 runs once per
  *set* bit, not once per bit position.

The same `x &= x - 1` step drives set-bit iteration in dataflow passes and bitmap indexes.

(Values from running it under GCC 16.2.)
