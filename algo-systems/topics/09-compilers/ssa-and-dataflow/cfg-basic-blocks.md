---
id: compiler-cfg-basic-blocks
kind: basic
version: 1
level: 2
tags: [compilers, cfg, ir]
refs:
  - https://doi.org/10.1145/390013.808479
  - https://llvm.org/docs/LangRef.html#functions
elaborate: A call that may throw can leave a block in the middle. How does LLVM's `invoke` keep the block rule intact?
---

## Which lines begin a new basic block?

```
1      i = 0
2  L:  if i >= n goto E
3      s = s + a[i]
4      i = i + 1
5      goto L
6  E:  return s
```

---

**1, 2, 3 and 6: the entry, every jump target, every line after a branch.**

A basic block is a maximal straight-line run, entered only at its
first instruction and left only at its last: here `{1} {2} {3–5} {6}`.
Control can enter mid-run only at a jump target, and leave only at a
branch.
