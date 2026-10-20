---
id: graph-explain-union-find
kind: explain
version: 1
level: 4
tags: [union-find, graphs, interview]
requires:
  - graph-union-find-problem
  - graph-union-find-worked
  - graph-union-find-trace
  - graph-union-find-union-code
  - graph-union-find-path-compression
refs:
  - https://doi.org/10.1145/364099.364331
  - https://doi.org/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
elaborate: Union-find cannot split a set again. Name a problem where that rules it out, and what you would use instead.
---
An interviewer asks you to explain union-find to a colleague who has
never used it. Answer aloud in about a minute.
---
- [ ] Problem: answer "are a and b connected?" while edges keep arriving, without searching the graph again
- [ ] Mechanism: each set is a tree in `parent[]`; find walks to the root, union points one root at the other
- [ ] Example: after union(1, 0) and union(2, 3), union(3, 1) writes only `parent[1] = 2`
- [ ] Cost: union by rank keeps height ≤ log₂ n; path compression makes later finds nearly one step
- [ ] Pitfall: union must re-point the root, not the element, or it splits the element from its set
