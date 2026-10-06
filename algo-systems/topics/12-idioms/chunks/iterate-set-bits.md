---
id: chunks-iterate-set-bits
kind: chunk
version: 1
level: 3
tags: [idioms, bit-tricks, compilers]
expose_ms: 6000
compile: null
requires:
  - graph-iterate-set-bits
  - foundations-bits-trace
refs:
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
  - https://graphics.stanford.edu/~seander/bithacks.html
---

```cpp
while (word) {
  const int i = std::countr_zero(word);
  visit(base + i);
  word &= word - 1;
}
```

---

Iterating the set bits of a bit vector, one instruction per bit and no
branch per candidate. `std::countr_zero` compiles to `tzcnt`/`bsf`, and
`word &= word - 1` clears the lowest set bit — the two halves of every
bitset loop in a compiler's dataflow pass, a graph algorithm's frontier,
or a database's bitmap index.

The alternative, `for (int i = 0; i < 64; ++i) if (word >> i & 1)`,
does 64 iterations and 64 unpredictable branches regardless of how many
bits are set; this version does exactly as many iterations as there are
bits.

The snippet is graded by whitespace-normalised equality (SPEC §4.7):
`visit` and `base` are deliberately undefined — it is one loop out of a
larger scan, not a program.
