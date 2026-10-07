---
id: compiler-liveness
kind: basic
version: 2
level: 4
tags: [compilers, dataflow, registers]
refs:
  - https://en.wikipedia.org/wiki/Live-variable_analysis
  - https://suif.stanford.edu/~courses/cs243/
elaborate: Deleting an assignment whose target is dead can make its operands' definitions dead too. Why does dead-code elimination therefore iterate?
---

## Which of `a`, `b`, `c` are live just after line 2?

```cpp
a = load();      // 1
b = a + 1;       // 2
c = a * b;       // 3
return c;        // 4
```

---

**`a` and `b`.**

A variable is live at a point if some path from there reads it before
redefining it. Line 3 reads both; `c` is written before any read. Liveness
flows backward, `live_in(b) = use(b) ∪ (live_out(b) − def(b))`, and
`live_out` is the union over successors.
