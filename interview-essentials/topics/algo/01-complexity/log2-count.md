---
id: complexity-log2-count
kind: basic
version: 1
level: 1
tags: [foundations, complexity, halving]
refs:
  - https://en.wikipedia.org/wiki/Binary_logarithm
---

```text
1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1
```

## Halving 1024 reaches 1 after 10 halvings, because 1024 = 2¹⁰. In what notation is that count of halvings written?

---

**log₂ 1024 = 10: the base-2 logarithm, the power of 2 that gives n.**

log₂ n counts how many times n halves before reaching 1, or doubles
from 1 to reach n. It grows slowly: log₂ 10⁶ ≈ 20, log₂ 10⁹ ≈ 30.
