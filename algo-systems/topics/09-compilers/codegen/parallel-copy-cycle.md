---
id: compiler-parallel-copy-cycle
kind: trace
version: 1
level: 4
tags: [compilers, ssa, codegen, registers, tracing]
probes:
  1: { "r[3]": "10" }
  2: { "src[0]": "1", "src[1]": "4" }
  3: { "r[0]": "11", "r[1]": "10", "moves": "4" }
requires:
  - compiler-parallel-copy
refs:
  - https://doi.org/10.1109/CGO.2009.19
elaborate: Which single x86 instruction would replace the three scratch moves for a two-register cycle?
---

```cpp
int r[5] = {10, 11, 12, 13, 0};          // r4 is the scratch register
int src[4] = {1, 0, 2, 0};               // r0 <- r1, r1 <- r0, r3 <- r0; r2 keeps
int moves = 0;
r[3] = r[src[3]]; src[3] = 3; ++moves;   // @1 r3 is nobody's source: emit first
r[4] = r[0]; ++moves;                    // only the swap is left: save r0
for (int& s : src) if (s == 0) s = 4;    // @2 readers of r0 now read r4
r[0] = r[src[0]]; src[0] = 0; ++moves;   // nobody reads r0 any more
r[1] = r[src[1]]; src[1] = 1; ++moves;   // @3
```

---

Sequentialising a parallel copy that contains a **cycle**. First drain
the chains (`r3 ← r0`, safe while `r0` still holds 10). What remains is a
swap, where every destination is someone's source, so no move is safe.
Copy one member into the scratch register and **redirect its readers**
there: the cycle becomes a chain and drains normally.

A naive `r0 = r1; r1 = r0` would leave both holding 11. The swap costs
one extra move, and one scratch register serves every cycle in turn
(Boissinot et al., CGO 2009). Values from an instrumented run, GCC 16.2.
