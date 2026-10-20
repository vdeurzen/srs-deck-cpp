---
id: graph-union-find-forest
kind: basic
version: 1
level: 1
tags: [union-find, graphs]
requires:
  - graph-union-find-problem
  - tree-terms
refs:
  - https://doi.org/10.1145/364099.364331
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
elaborate: How would you use this to detect that adding edge (u, v) to an undirected graph closes a cycle?
---

## Union-find stores disjoint sets as an array `parent[]`; each set is a tree. How does it decide whether `2` and `4` are in the same set?

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
set, so two elements share a set exactly when their walks end at the
same root. A query costs the length of the path walked.
