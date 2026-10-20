---
id: graph-bellman-ford-worked
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, worked-example]
requires:
  - interview-essentials/graph-bellman-ford-rounds
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---

## Bellman-Ford from s, with the edges listed as b → c (1), then s → b (2). Each round relaxes every edge once, in list order; ∞ means not reached.

```
round   b → c (1)          s → b (2)     dist s b c
1       b is ∞: skip       b = 0 + 2     0 2 ∞
2       c = 2 + 1 = 3      no change     0 2 3
```

Why is c still unreached after round 1, though s → b → c has only two edges?

---

**b → c ran first in the list, before b had a distance.**

Each round extends known paths by at least one edge, by more only when
the list runs along the path. In the worst order, a k-edge path needs k
rounds: hence V − 1.
