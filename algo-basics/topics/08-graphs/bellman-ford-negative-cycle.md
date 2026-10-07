---
id: graph-bellman-ford-negative-cycle
kind: code
version: 1
level: 3
tags: [graphs, shortest-paths, cycles]
input: chips
choices:
  c1: ["relax(e)", "e.w < 0", "!relax(e)", "dist[e.v] < 0"]
compile:
  harness: |
    // a negative edge, no cycle: 0→1 (3) 1→2 (−2) 0→2 (2)
    constexpr Edge kDag[] = {{0, 1, 3}, {1, 2, -2}, {0, 2, 2}};
    static_assert(!negative_cycle<3>(kDag));
    // 1→2→1 costs 1 − 3 = −2
    constexpr Edge kLoop[] = {{0, 1, 4}, {1, 2, 1}, {2, 1, -3}};
    static_assert(negative_cycle<3>(kLoop));
    int main() {}
requires:
  - graph-bellman-ford-rounds
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm#Finding_negative_cycles
---

After the usual V − 1 rounds, one more pass over the edges decides
whether a negative cycle exists. `relax` lowers `dist[e.v]` if it can
and says whether it did. Complete the test.

```cpp
struct Edge { int u, v, w; };
template <int V, int E> constexpr bool negative_cycle(const Edge (&es)[E]) {
  int dist[V] = {};                                    // every vertex a start
  auto relax = [&](const Edge& e) {
    if (dist[e.u] + e.w >= dist[e.v]) return false;
    dist[e.v] = dist[e.u] + e.w; return true;
  };
  for (int r = 0; r < V - 1; ++r) for (const Edge& e : es) relax(e);
  for (const Edge& e : es) if ({{c1::relax(e)}}) return true;
  return false;
}
```

---

**An edge that still improves after V − 1 rounds means a negative
cycle.** Without one, every distance is final by then, so nothing can
improve. Going around a negative cycle lowers the cost every lap, so
some edge on it always can.

A negative edge alone (`e.w < 0`) is not a cycle: the first graph,
0→1 (3), 1→2 (−2), 0→2 (2), has one and no cycle at all. `dist[e.v] < 0` makes the same mistake.
