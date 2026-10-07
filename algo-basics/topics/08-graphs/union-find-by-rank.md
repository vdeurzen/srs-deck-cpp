---
id: graph-union-find-by-rank
kind: cloze
version: 1
level: 2
tags: [union-find, complexity]
requires:
  - graph-union-find-union-code
  - complexity-log-halvings
refs:
  - https://doi.org/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Union_by_rank
elaborate: Union 0–1, 1–2, 2–3, … always hanging the old tree under the new single node. What does find(0) cost after n unions?
---

With union by rank, a rank only grows when two trees of equal rank
meet, so a root of rank r has at least {{c1::2ʳ}} nodes in its tree.
A set has at most n nodes, so no tree is taller than {{c2::log₂ n}},
and `find` walks at most that many steps.

```
rank 1 + rank 1 → rank 2       0           4 nodes = 2²
                              / \
                             1   2
                                 |
                                 3
```
