---
id: str-simd-scanning
kind: basic
version: 1
level: 5
tags: [strings, simd, parsing, low-latency]
requires:
  - graph-iterate-set-bits
refs:
  - https://arxiv.org/abs/1902.08318
  - https://en.algorithmica.org/hpc/simd/
elaborate: For a single delimiter byte, `memchr` already does this. When is hand-written SIMD scanning worth it?
---

## A parser scans for delimiters 64 bytes at a time with SIMD. What is the general pattern?

---

**Compare all 64 bytes at once into a bitmask, then do arithmetic on the mask.**

`countr_zero` finds the next match and `mask &= mask - 1` clears it. A
chunk with no delimiters costs a load, a compare and one branch; work
scales with matches, not bytes. simdjson builds its whole structural
pass this way, from several masks.
