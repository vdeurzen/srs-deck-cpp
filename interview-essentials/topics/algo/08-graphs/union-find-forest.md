---
id: graph-union-find-forest
kind: basic
version: 1
level: 1
tags: [union-find, graphs]
refs:
  - https://doi.org/10.1145/364099.364331
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
elaborate: Kruskal's algorithm asks "would this edge close a cycle?" for every edge. How does this structure answer it?
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
set. Union finds both roots, then makes one write: point one root at
the other. A query costs the length of the path walked.
