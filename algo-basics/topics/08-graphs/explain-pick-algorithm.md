---
id: graph-explain-pick-algorithm
kind: explain
version: 2
level: 4
tags: [graphs, interview, judgement]
requires:
  - interview-essentials/graph-dijkstra-why-nonnegative
  - interview-essentials/graph-bellman-ford-rounds
  - graph-bellman-ford-negative-cycle
elaborate: If the one-way roads could never lead back to a depot already passed, which faster method would still handle the rebates, and why?
refs:
  - https://doi.org/10.1090/qam/102435
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---
A teammate routes trucks between depots on one-way roads. Each road
charges a toll, but some roads pay the driver a rebate instead. They
need the cheapest route from the home depot to every other depot, and
ask which algorithm you would pick, and why.
---
- [ ] Bellman-Ford from the home depot: relax every road, in any order, V − 1 times
- [ ] A rebate is a negative weight, which breaks Dijkstra's rule that a popped depot's cost is final
- [ ] V − 1 rounds suffice: a cheapest route repeats no depot, so uses at most V − 1 roads
- [ ] It costs O(V · E): every road is relaxed once in each of the V − 1 rounds
- [ ] If one extra round still lowers a cost, a loop of rebates sums below 0: no cheapest route exists
