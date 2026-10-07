---
id: foundations-branchless-when
kind: basic
version: 1
level: 3
requires:
  - foundations-branch-misprediction
tags: [cost-model, branchless, low-latency]
elaborate: Where else does the "fixed small cost instead of a probabilistic large one" trade appear — in a lock, an allocator, a hash table?
refs:
  - https://en.algorithmica.org/hpc/pipelining/branching/
  - https://en.algorithmica.org/hpc/pipelining/branchless/
---

## `if (b >= 128) sum += b;` runs once over random bytes and once over the same bytes sorted. For which input is a branchless rewrite worth it?

---

**Random bytes: the branch is unpredictable and both sides are cheap.**
Branchless code (`cmov`, a mask, a SIMD blend) executes both sides and
selects, a fixed small cost every time. On sorted data the predictor is
already nearly always right, so branchless pays that cost for nothing.
