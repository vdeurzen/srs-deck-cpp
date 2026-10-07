---
id: heap-lazy-deletion-guard
kind: code
version: 1
level: 4
requires:
  - heap-lazy-deletion
tags: [heaps, graphs, idioms]
input: chips
choices:
  c1: [">", "<", ">=", "=="]
compile:
  harness: |
    constexpr Result run() {          // s=0, a=1, b=2, c=3
      Graph g;
      g[0] = {{1, 4}, {2, 1}};        // s→a 4, s→b 1
      g[1] = {{3, 1}};                // a→c 1
      g[2] = {{1, 1}};                // b→a 1
      return dijkstra(g);
    }
    static_assert(run().dist == std::array<int, 4>{0, 2, 1, 3});
    static_assert(run().scans == 4, "a stale entry relaxed its edges");
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---

Dijkstra over a binary heap with no `decrease_key`. Complete the test
that throws away stale entries without ever skipping a live one.

```cpp
#include <algorithm>
#include <array>
#include <functional>
#include <utility>
#include <vector>

using Graph = std::array<std::vector<std::pair<int, int>>, 4>;  // (to, w)
struct Result { std::array<int, 4> dist; int scans; };

constexpr Result dijkstra(const Graph& g) {
  Result r{{0, 1000, 1000, 1000}, 0};
  std::vector<std::pair<int, int>> pq{{0, 0}};                   // (d, v)
  while (!pq.empty()) {
    std::ranges::pop_heap(pq, std::greater{});
    auto [d, v] = pq.back(); pq.pop_back();
    if (d {{c1::>}} r.dist[v]) continue;
    for (auto [u, w] : g[v]) {
      ++r.scans;
      if (d + w < r.dist[u]) {
        r.dist[u] = d + w;
        pq.push_back({d + w, u}); std::ranges::push_heap(pq, std::greater{});
      }
    }
  }
  return r;
}
```

---

`dist[v]` only ever decreases, and every entry was pushed carrying the
`dist[v]` of its moment, so a popped `d` is never below `dist[v]`: equal
means live, greater means a later push superseded it. Here `a` is pushed
at 4, then again at 2 via `b`; the `(4, a)` entry pops last and must be
dropped.

`>=` drops the live entries too — even the source — and every distance
stays at 1000; `==` keeps only the stale ones. `<` is never true, so
nothing is dropped: the distances still come out right, but the stale
`(4, a)` rescans `a`'s edge, and `scans` is 5. That is why the harness
counts work, not just answers — lazy deletion without its guard is
correct and quietly does extra relaxations, up to one per stale entry.
