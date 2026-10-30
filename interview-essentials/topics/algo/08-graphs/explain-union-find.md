---
id: graph-explain-union-find
kind: explain
version: 2
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
- [ ] It answers "are a and b connected?" while edges keep arriving, without searching the graph again
- [ ] Each set is a tree in `parent[]`: find walks up to the root; union(a, b) points b's root at a's
- [ ] After union(1, 0) and union(2, 3), union(3, 1) writes only `parent[1] = 2`
- [ ] Union by rank keeps every tree at most log₂ n tall; path compression makes later finds nearly one step
- [ ] Union must re-point the element's root, not the element, or it splits the element from its set
