---
id: gr-dijkstra-heap-parsons
kind: parsons
version: 1
level: 3
tags: [graphs, shortest-paths, dijkstra, heaps, lc-743, lc-1631]
distractors:
  - "    if (d >= dist[u]) continue;"
  - "    auto [u, d] = pq.top();"
compile:
  harness: |
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <utility>
    #include <vector>
    using P = std::pair<int, int>;   // {distance, vertex}
    struct MinHeap {                 // constexpr stand-in for priority_queue<P, vector<P>, greater<P>>
      std::vector<P> v;
      constexpr bool empty() const { return v.empty(); }
      constexpr P top() const { return v.front(); }
      constexpr void push(P x) { v.push_back(x); std::ranges::push_heap(v, std::greater<>{}); }
      constexpr void pop() { std::ranges::pop_heap(v, std::greater<>{}); v.pop_back(); }
    };
    struct Adj {                     // adjacency {to, weight}; counts how many vertices are expanded
      std::vector<P> e[6];
      mutable int scans = 0;
      constexpr const std::vector<P>& operator[](int u) const { ++scans; return e[u]; }
    };
    constexpr bool delays() {
      // 0->1 (4), 0->2 (1), 2->1 (1), 1->3 (1), 2->3 (5), 3->4 (2); vertex 5 unreachable
      Adj g{{{{1, 4}, {2, 1}}, {{3, 1}}, {{1, 1}, {3, 5}}, {{4, 2}}, {}, {}}};
      constexpr int INF = 1'000'000'000;
      std::array<int, 6> dist; dist.fill(INF);
      dijkstra(g, dist, 0, MinHeap{});
      return dist == std::array{0, 2, 1, 3, 5, INF}
          && g.scans == 5;           // stale entries for 1 and 3 are popped but not expanded
    }
    static_assert(delays());
    #include <queue>
    int main() {                     // also instantiates it with the real priority_queue
      std::vector<P> g[2] = {{{1, 3}}, {}};
      std::array<int, 2> dist{1'000'000'000, 1'000'000'000};
      dijkstra(g, dist, 0, std::priority_queue<P, std::vector<P>, std::greater<P>>{});
      return dist[1];
    }
requires:
  - graph-dijkstra-popped-final
  - stl-pq-min-heap-type
refs:
  - https://leetcode.com/problems/network-delay-time/
  - https://doi.org/10.1007/BF01386390
  - https://cp-algorithms.com/graph/dijkstra_sparse.html
elaborate: LC 1631 (path with minimum effort) runs this loop on a grid. What replaces `d + w`, and why does the skip test still hold?
---

LC 743: shortest times from `s`. `g[u]` lists `{v, w}` edges with
`w ≥ 0`, `dist` starts all infinite, and `pq` arrives as an empty
`std::priority_queue<P, std::vector<P>, std::greater<P>>` of
`P = {distance, vertex}`. Order the lines.

```cpp
constexpr void dijkstra(const auto& g, auto& dist, int s, auto pq) {
  pq.push({dist[s] = 0, s});
  while (!pq.empty()) {
    auto [d, u] = pq.top();
    pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : g[u]) if (d + w < dist[v]) pq.push({dist[v] = d + w, v});
  }
}
```

---

**Dijkstra with lazy deletion.** Seed `s` at 0; pop the nearest entry;
skip it if stale; relax its edges. `priority_queue` has no
decrease-key, so an improved vertex is pushed again and the old entry
stays behind. When an entry pops with `d > dist[u]`, a cheaper one
already finished `u`, so its edges are not scanned again. O(E log E).
Correct only for w ≥ 0: the skip test assumes a popped distance is
final.

`top()` is read before `pop()` because `pop()` returns nothing. `>=`
skips every live entry too, since a fresh entry has `d == dist[u]`.
`{u, d}` reads the pair backwards: distance goes first so that pair
comparison orders the heap by distance. `pq` is a parameter only so the
harness can also pass a constexpr heap, since `priority_queue` is not
constexpr. LC 743's answer is the largest `dist`, or −1 if any is
still infinite.
