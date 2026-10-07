---
id: compiler-pass-pipeline
kind: basic
version: 2
level: 2
tags: [compilers, optimisation, llvm]
refs:
  - https://llvm.org/docs/Passes.html
  - https://llvm.org/docs/NewPassManager.html
elaborate: A query planner applies rewrite rules one after another. Which property must each of its rules preserve?
---

## LLVM runs `mem2reg`, then `instcombine`, then dozens more transform passes. What must every one of them preserve?

```
before mem2reg:  store %a, %p   %v = load %p   %r = add %v, 0
after mem2reg:   %r = add %a, 0        instcombine then: uses of %r become %a
```

---

**The program's observable behaviour, in IR that still verifies.**

Correctness composes, so the IR after any prefix of the pipeline is a
correct program. Usefulness does not: `instcombine` folds `add %a, 0`
only once `mem2reg` has removed the load hiding `%a`. Some passes also
expect a canonical form set up earlier (`LoopSimplify` before LICM).
