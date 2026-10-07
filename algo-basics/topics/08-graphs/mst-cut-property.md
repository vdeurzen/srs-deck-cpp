---
id: graph-mst-cut-property
kind: basic
version: 1
level: 1
tags: [graphs, mst, greedy]
refs:
  - https://en.wikipedia.org/wiki/Minimum_spanning_tree#Cut_property
  - https://doi.org/10.1090/S0002-9939-1956-0078686-7
elaborate: Where does the argument need the weights to be distinct, and what changes if two crossing edges tie?
---

## Split this graph's vertices into {a, b} and {c, d}. Why does some minimum spanning tree contain the lightest edge crossing that split?

```
a ─1─ b
│     │          crossing edges: a–c (4), b–d (2)
4     2
│     │
c ─3─ d
```

---

**Every spanning tree crosses the split; swapping in the lightest crossing edge never costs more.**

If a tree used a–c instead, add b–d: that closes a cycle crossing the
split twice; dropping a–c leaves a tree lighter by 2. With distinct
weights, as here, the MST is unique and must contain it: a–b, b–d,
c–d = 6.
