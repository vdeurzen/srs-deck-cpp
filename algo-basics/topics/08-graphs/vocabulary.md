---
id: graph-vocabulary
kind: cloze
version: 1
level: 1
tags: [graphs, vocabulary]
refs:
  - https://en.wikipedia.org/wiki/Glossary_of_graph_theory
---

```
0 ─ 1 ─ 2      5 ─ 6
    │   │
    3 ─ 4
```

In this undirected graph, vertex 1 has {{c1::degree}} 3: three edges
touch it. 0, 1, 3, 4 is a {{c2::path}}: each consecutive pair is joined
by an edge. The graph is not {{c3::connected}}, because no path joins 0
and 5.
