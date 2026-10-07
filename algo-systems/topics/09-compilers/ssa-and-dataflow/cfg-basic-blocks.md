---
id: compiler-cfg-basic-blocks
kind: basic
version: 1
level: 2
tags: [compilers, cfg, ir]
refs:
  - https://doi.org/10.1145/390013.808479
  - https://llvm.org/docs/LangRef.html#functions
elaborate: An instruction that may throw can leave a block in the middle. How do LLVM's `invoke` and Go's panics each deal with that?
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
first instruction and left only at its last. Blocks `{1} {2} {3–5} {6}`
become the nodes of the control-flow graph; its edges are the possible
jumps and fall-throughs between them.
