---
id: str-simd-tail
kind: basic
version: 1
level: 4
tags: [strings, simd, undefined-behaviour]
requires:
  - str-simd-scanning
refs:
  - https://github.com/simdjson/simdjson/blob/master/doc/basics.md
  - https://en.cppreference.com/w/cpp/language/ub
---

## A SIMD scanner loads 64 bytes per step from a 1000-byte buffer. What goes wrong if its last step is an ordinary 64-byte load at offset 960?

---

**It reads 24 bytes past the buffer: undefined behaviour, and a fault at a page edge.**

Only 40 bytes are valid. The fixes: require padding after the input
(simdjson does), or finish with a scalar or masked epilogue. Tests
rarely catch it, because the overread usually lands in mapped memory.
