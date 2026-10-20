---
id: graph-bellman-ford-negative-cycle
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths, cycles]
requires:
  - graph-bellman-ford-rounds
  - graph-cycle-spot
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm#Finding_negative_cycles
elaborate: Currency rates can be turned into edge weights so that an arbitrage loop shows up as this check firing. Say aloud what weight each rate would become.
---

## Bellman-Ford from s has run its V − 1 = 2 rounds here. A third round still lowers `dist[a]`, from −3 to −5. What does that prove about the graph?

```
s →(1) a      a →(1) b      b →(−3) a
```

---

**A cycle whose weights sum below 0 is reachable: no cheapest path exists.**

V − 1 rounds settle every `dist` unless such a cycle exists. Here
a → b → a costs 1 − 3 = −2, so every lap is cheaper and `dist` falls
forever. Running round V as a check is how Bellman-Ford reports it.
