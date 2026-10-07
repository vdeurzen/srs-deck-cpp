---
id: compiler-ssa-dominance-property
kind: basic
version: 1
level: 4
tags: [compilers, ssa, dominance, code-motion]
requires:
  - compiler-ssa-form
  - compiler-dominance
refs:
  - https://llvm.org/docs/LangRef.html#well-formedness
  - https://dl.acm.org/doi/10.1145/115372.115320
elaborate: LICM hoists `t = a * b` out of a loop. Which two dominance conditions must the target block satisfy?
---

## Which block relation must hold between an SSA definition and each of its uses for the IR to be well-formed?

---

**The definition dominates every use.**

Otherwise some path reaches the use without computing the value. Code
motion must keep this: a value may move only to a
block that its operands' definitions dominate and that dominates its
uses. LLVM's verifier rejects IR that breaks it.
