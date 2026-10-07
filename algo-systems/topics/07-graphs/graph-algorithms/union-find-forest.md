---
id: graph-union-find-forest
kind: basic
version: 1
level: 2
tags: [union-find, graphs]
refs:
  - https://doi.org/10.1145/364099.364331
  - https://dl.acm.org/doi/10.1145/321879.321884
elaborate: Kruskal's algorithm asks "would this edge close a cycle?" for every edge. How does this structure answer it?
---

## Union-find stores disjoint sets as trees of parent pointers. How does it decide whether `2` and `4` are in the same set?

```
parent = {0, 0, 1, 3, 3}        0       3
                                |       |
                                1       4
                                |
                                2
```

---

**Follow parent pointers from each to its root (`parent[r] == r`): same root, same set.**

Here `2 → 1 → 0` and `4 → 3`, so different sets. The root names the
set, so merging two sets is one write: point one root at the other.
A query costs the length of the path walked.
