---
id: graph-cycle-directed-grey
kind: basic
version: 1
level: 2
tags: [graphs, dfs, cycles]
requires:
  - graph-dfs-worked
  - graph-cycle-spot
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Output_of_a_depth-first_search
  - https://doi.org/10.1137/0201010
elaborate: In a dependency resolver, which vertices would you print in the error message for a cycle, and where does DFS keep them?
---

## DFS on this directed graph from `a` reaches `d` twice. It has no cycle. What must the second visit find to mean "cycle"?

```
a → b → d
a → c → d
```

---

**`d` must be on the current DFS path: started, not yet finished ("grey").**

Colours: white = not started, grey = started, black = finished. Here
`d` is black on the second visit, so `a → c → d` merely rejoins. An
edge to a grey vertex points back up the active path: a cycle.
