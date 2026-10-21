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
    #include <array>
    using Graph = std::array<std::vector<std::pair<int, int>>, 4>;  // (to, w)
    struct Result { std::array<int, 4> dist; int scans; };
    constexpr Result dijkstra(const Graph& g) {
      Result r{{0, 1000, 1000, 1000}, 0};
      std::vector<std::pair<int, int>> pq{{0, 0}};
      while (!pq.empty()) {
        const int v = pop_live(pq, r.dist.data());
        if (v < 0) continue;
        for (auto [u, w] : g[v]) {
          ++r.scans;
          if (r.dist[v] + w < r.dist[u]) {
            r.dist[u] = r.dist[v] + w;
            pq.push_back({r.dist[u], u});
            std::ranges::push_heap(pq, std::greater{});
          }
        }
      }
      return r;
    }
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

Dijkstra without `decrease_key`: an improved `dist[v]` pushes a new
`(d, v)` and leaves the old entry in the heap. Complete the test that
drops stale entries but never a live one.

```cpp
#include <algorithm>
#include <functional>
#include <utility>
#include <vector>
constexpr int pop_live(std::vector<std::pair<int, int>>& pq, const int* dist) {
  std::ranges::pop_heap(pq, std::greater{});
  auto [d, v] = pq.back(); pq.pop_back();
  if (d {{c1::>}} dist[v]) return -1;              // -1: skip this entry
  return v;
}
```

---

**Stale means `d > dist[v]`: a later push superseded this entry.**
`dist[v]` only decreases and each entry carried the `dist[v]` of its
moment, so equal means live. Here `a` is pushed at 4, then at 2 via
`b`; `(4, a)` pops last and is dropped.

`>=` drops live entries, even the source. `==` keeps only stale ones.
`<` drops nothing: distances stay right, but `(4, a)` rescans `a`'s
edge (`scans` 5): lazy deletion without its guard silently does extra
work.
