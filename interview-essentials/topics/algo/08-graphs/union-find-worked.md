---
id: graph-union-find-worked
kind: basic
version: 1
level: 2
tags: [union-find, graphs, worked-example]
requires:
  - graph-union-find-forest
refs:
  - https://doi.org/10.1145/364099.364331
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Union
---

## Union-find on 5 elements, each its own root at the start. `union(a, b)` finds both roots and points b's root at a's root. Why does `union(1, 4)` write `parent[3]`, when it was asked about 1 and 4?

```
step          roots   write           parent[0..4]
start         —       —               0 1 2 3 4
union(0, 1)   0, 1    parent[1] = 0   0 0 2 3 4
union(3, 4)   3, 4    parent[4] = 3   0 0 2 3 3
union(1, 4)   0, 3    parent[3] = 0   0 0 2 0 3
```

---

**3 is 4's root; re-pointing the root moves 4's whole tree in one write.**

Writing `parent[4] = 0` instead would cut 4 away from 3 and split
{3, 4}. After the root write every element keeps its path, now one
step longer: `find(4)` walks 4 → 3 → 0.
