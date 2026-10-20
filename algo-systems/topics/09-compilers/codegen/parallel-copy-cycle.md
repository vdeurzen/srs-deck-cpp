---
id: compiler-parallel-copy-cycle
kind: trace
version: 2
level: 4
tags: [compilers, ssa, codegen, registers, tracing]
probes:
  1: { "src[0]": "1", "src[1]": "2" }
  2: { "r[0]": "11", "r[1]": "10" }
requires:
  - compiler-parallel-copy-cycle-worked
  - compiler-parallel-copy-cycle-break
refs:
  - https://doi.org/10.1109/CGO.2009.19
elaborate: Which single x86 instruction would replace the three moves for a two-register cycle?
---

The parallel copy `r0 ← r1, r1 ← r0` stored as `r[d] = r[src[d]]`, all
at once. It is a cycle, so `r2` serves as the scratch register.

```cpp
int r[3] = {10, 11, 0};
int src[2] = {1, 0};
r[2] = r[0];                                       // save r0
for (int d = 0; d < 2; ++d) if (src[d] == 0) src[d] = 2;   // @1
r[0] = r[src[0]];
r[1] = r[src[1]];                                  // @2
```

---

Saving `r0` in the scratch frees it; the loop then **redirects every
reader of `r0`** to `r2`. Only `r1` read `r0`, so `src[1]` becomes 2 and
`src[0]` keeps reading `r1`. Now the moves form a chain and run in
order: `r0` gets 11, then `r1` gets the saved 10. Emitting `r0 = r1;
r1 = r0` instead would leave both at 11.

Values from an instrumented run, GCC 16.2.
