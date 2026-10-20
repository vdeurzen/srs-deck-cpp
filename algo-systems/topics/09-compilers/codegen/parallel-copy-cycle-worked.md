---
id: compiler-parallel-copy-cycle-worked
kind: basic
version: 1
level: 4
tags: [compilers, ssa, codegen, registers, worked-example]
requires:
  - compiler-parallel-copy-cycle-break
refs:
  - https://doi.org/10.1109/CGO.2009.19
---

Sequentialising the parallel copy `r0 ← r1, r1 ← r0, r3 ← r0`, with
`r4` as the scratch register. Registers start as `r0 = 10`, `r1 = 11`.

```
move      why it is safe now          r0  r1  r3  r4
r3 ← r0   nobody reads r3             10  11  10  —
r4 ← r0   only a cycle left: save r0  10  11  10  10
r0 ← r1   r0's reader now reads r4    11  11  10  10
r1 ← r4   nobody reads r1 any more    11  10  10  10
```

## Row 2: after the first move, why can neither `r0 ← r1` nor `r1 ← r0` go next?

---

**Each destination is the other's unread source: writing either destroys a needed value.**

`r3` was safe because no move reads it. In the swap, `r0 ← r1` first
would lose the 10 that `r1` needs, and the reverse loses the 11. Saving
one member in the scratch and pointing its reader there turns the cycle
into a chain.
