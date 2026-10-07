---
id: compiler-ssa-form
kind: basic
version: 2
level: 4
tags: [compilers, ssa, ir]
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://llvm.org/docs/LangRef.html#phi-instruction
elaborate: All φs at the top of a block are evaluated together, before any of them writes. Where would that bite if you lowered them one by one?
---

## In SSA form, what does the join block insert to read `x` here?

```cpp
if (c) x = 1;    // x1
else   x = 2;    // x2
use(x);          // join block
```

---

**A φ-function, `x3 = φ(x1, x2)`, that picks its operand by incoming edge.**

SSA assigns every value exactly once, so the join cannot name a single
definition of `x`. The φ is notation, not a machine instruction: it
means "the value from whichever predecessor we came from".
