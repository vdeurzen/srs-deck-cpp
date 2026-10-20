---
id: graph-dijkstra-popped-final
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, invariants]
requires:
  - graph-dijkstra-worked
refs:
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Proof_of_correctness
elaborate: Say in one sentence, as to an interviewer, why BFS needs no priority queue to get the same guarantee.
---

## Dijkstra always pops the unpopped vertex with the smallest `dist`. With non-negative weights, why is a vertex's `dist` already final when it is popped?

```
s →(1) a →(1) b          s →(3) b
pops: s 0, a 1, b 2      (the direct edge offers 3)
```

---

**Any other route leaves the popped set through a vertex at least as far.**

When `b` is popped at 2, every unpopped vertex is at ≥ 2. A route to
`b` through any of them costs at least 2 plus non-negative edges, so it
cannot beat 2. BFS is the all-weights-1 case.
