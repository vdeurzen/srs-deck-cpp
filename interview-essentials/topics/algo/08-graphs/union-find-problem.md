---
id: graph-union-find-problem
kind: basic
version: 1
level: 1
tags: [foundations, graphs, connectivity]
requires:
  - graph-path-cycle-component
refs:
  - https://doi.org/10.1145/364099.364331
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
elaborate: Why is re-running a graph search after each of 100 000 arriving edges too slow, and what does keeping the groups save?
---

## Vertices 1–4 start with no edges. Edges arrive one at a time: (1, 2), then (3, 4), then (2, 3). After which edge is there first a path from 1 to 4?

---

**After (2, 3): it joins the group {1, 2} to the group {3, 4}.**

Each edge merges two groups of connected vertices or falls inside one.
So "is there a path?" needs only the groups: the disjoint-set problem.
Union-find answers it with `union(a, b)` and `find(a)`, no graph search.
