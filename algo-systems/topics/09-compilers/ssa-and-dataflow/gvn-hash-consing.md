---
id: compiler-gvn-hash-consing
kind: basic
version: 2
level: 5
tags: [compilers, ssa, optimisation, hashing]
requires:
  - compiler-ssa-form
refs:
  - https://dl.acm.org/doi/10.1145/207110.207154
  - https://llvm.org/docs/Passes.html#gvn-global-value-numbering
elaborate: Congruence catches `a + b` twice but not `a + b` against `b + a + 0`. What has to run first, or what structure replaces it?
---

## How does value numbering decide that two SSA expressions compute the same value?

---

**Congruence: same opcode, and operands with the same value numbers.**

A hash table maps `(opcode, operand numbers)` to a number. A hit means
the expression is redundant; a miss installs a new number. Commutative
operands are sorted first, and since an SSA operand *is* its
definition, no dataflow is needed.
