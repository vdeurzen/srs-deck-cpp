---
id: compiler-phi-swap
kind: basic
version: 1
level: 5
tags: [compilers, ssa, codegen]
requires:
  - compiler-ssa-destruction
refs:
  - https://doi.org/10.1002/(SICI)1097-024X(19980710)28:8%3C859::AID-SPE188%3E3.0.CO;2-8
  - https://doi.org/10.1109/CGO.2009.19
elaborate: Python's `a, b = b, a` has the same semantics. How does CPython avoid losing a value?
---

## Block `B` starts with `a2 = φ(b1, …)` and `b2 = φ(a1, …)`. Why is emitting `a = b; b = a` in the predecessor wrong?

---

**It is a swap: φs read before any writes, but `b = a` reads the new `a`.**

Both end up holding `b`'s value. The whole φ group must be lowered as
one parallel copy, then sequentialised so no move overwrites a value a
later move still reads.
