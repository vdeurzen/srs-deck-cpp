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
    struct Count { int tops = 0, pops = 0, reads = 0; };
    struct MinHeap {                 // constexpr stand-in for priority_queue<P, vector<P>, greater<P>>
      std::vector<P> v;
      Count* n;                      // counts top() and pop(), so an extra line shows
      constexpr bool empty() const { return v.empty(); }
      constexpr P top() const { ++n->tops; return v.front(); }
      constexpr void push(P x) { v.push_back(x); std::ranges::push_heap(v, std::greater<>{}); }
      constexpr void pop() { ++n->pops; std::ranges::pop_heap(v, std::greater<>{}); v.pop_back(); }
    };
    struct Dist {                    // std::array<int, 6> that counts subscripts
      std::array<int, 6> a;
      Count* n;
      constexpr int& operator[](int i) { ++n->reads; return a[i]; }
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
      Count n;
      Dist dist{{}, &n}; dist.a.fill(INF); dist.a[0] = 0;
      dijkstra(g, dist, MinHeap{{{0, 0}}, &n});
      return dist.a == std::array{0, 2, 1, 3, 5, INF}
          && g.scans == 5            // stale entries for 1 and 3 are popped but not expanded
          && n.tops == 7 && n.pops == 7 && n.reads == 19;   // 7 entries; 7 + 6 + 6 subscripts
    }
    static_assert(delays());
    #include <queue>
    int main() {                     // also instantiates it with the real priority_queue
      std::vector<P> g[2] = {{{1, 3}}, {}};
      std::array<int, 2> dist{0, 1'000'000'000};
      std::priority_queue<P, std::vector<P>, std::greater<P>> pq;
      pq.push({0, 0});
      dijkstra(g, dist, pq);
      return dist[1];
    }
requires:
  - gr-dijkstra-stale-entry
  - cpp-essentials/structured-bindings-basics
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/network-delay-time/
  - https://leetcode.com/problems/path-with-minimum-effort/
  - https://doi.org/10.1007/BF01386390
  - https://cp-algorithms.com/graph/dijkstra_sparse.html
elaborate: Path With Minimum Effort (LC 1631), a grid route from top-left to bottom-right whose largest height step between neighbours is smallest, runs this loop. What replaces `d + w`, and why does the skip test still hold?
---

Network Delay Time (LC 743): a signal leaves node `s` along directed
edges with travel times; how long until every node has it? Dijkstra
gives the shortest time to each node. `g[u]` lists `{v, w}` edges with
`w ≥ 0`. `dist` is infinite except `dist[s] = 0`, and `pq` arrives as a
smallest-first `std::priority_queue` holding the one pair `{0, s}`, each
pair `{distance, vertex}`. Order the lines.

```cpp
constexpr void dijkstra(const auto& g, auto& dist, auto pq) {
  while (!pq.empty()) {
    auto [d, u] = pq.top();
    pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : g[u])
      if (d + w < dist[v]) { dist[v] = d + w;  pq.push({d + w, v}); }
  }
}
```

---

**Dijkstra with lazy deletion: pop the nearest entry, skip it if stale,
relax its edges.** An improved vertex is pushed again, so the heap holds
up to E entries: O(E log E). Correct only for w ≥ 0: the skip test
assumes a popped distance is final.

`top()` is read before `pop()` because `pop()` returns nothing. `>=`
skips every live entry too, since a fresh entry has `d == dist[u]`.
`{u, d}` reads the pair backwards: distance goes first so that pair
comparison orders the heap by distance.
