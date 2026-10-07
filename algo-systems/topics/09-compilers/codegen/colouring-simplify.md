---
id: compiler-colouring-simplify
kind: code
version: 1
level: 5
tags: [compilers, codegen, registers, graphs]
input: chips
choices:
  c1:
    - "std::popcount(g[n] & left) < K"
    - "std::popcount(g[n]) < K"
    - "std::popcount(g[n] & left) <= K"
    - "std::popcount(g[n] & left) >= K"
compile:
  harness: |
    // select: pop in reverse, give each node the lowest colour no neighbour has
    constexpr bool coloured(const Graph& g, int K) {
      const auto order = simplify(g, K);
      int col[6]{-1, -1, -1, -1, -1, -1};
      for (int i = 5; i >= 0; --i) {
        const int n = order[i];
        unsigned taken = 0;
        for (int m = 0; m < 6; ++m) if ((g[n] >> m & 1) && col[m] >= 0) taken |= 1u << col[m];
        if (std::countr_one(taken) >= K) return false;            // a spill
        col[n] = std::countr_one(taken);
      }
      return true;
    }
    constexpr Graph edges(std::initializer_list<std::array<int, 2>> es) {
      Graph g{};
      for (auto [a, b] : es) { g[a] |= 1u << b; g[b] |= 1u << a; }
      return g;
    }
    static_assert(coloured(edges({{5, 4}, {4, 0}, {0, 2}, {2, 3}, {3, 1}}), 2));   // a path
    static_assert(coloured(edges({{2, 0}, {2, 1}, {2, 3}, {0, 4}}), 2));           // a tree
    static_assert(coloured(edges({{0, 1}, {0, 3}, {0, 4}, {1, 3}, {1, 5},
                                  {2, 4}, {2, 5}, {3, 4}, {3, 5}}), 3));
    int main() {}
requires:
  - compiler-graph-colouring
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://dl.acm.org/doi/10.1145/177492.177575
elaborate: Every graph here is colourable with K colours, yet a wrong removal order spills. What does that say about blaming the register count for spills?
---

Simplify returns the order in which nodes leave the interference graph;
select will colour them in reverse. Complete the test for a node that
is safe to remove now.

```cpp
#include <array>
#include <bit>
using Graph = std::array<unsigned, 6>;          // bit m of g[n]: n, m interfere

constexpr std::array<int, 6> simplify(const Graph& g, int K) {
  std::array<int, 6> order{};
  unsigned left = 0b111111;                     // nodes still in the graph
  for (int& out : order) {
    out = std::countr_zero(left);               // stuck: push one optimistically
    for (int n = 0; n < 6; ++n)
      if ((left >> n & 1) && {{c1::std\::popcount(g[n] & left) < K}}) { out = n; break; }
    left &= ~(1u << out);
  }
  return order;
}
```

---

**Fewer than K neighbours *still in the graph*.** When select reaches
that node, at most K − 1 neighbours are coloured, so a colour is free:
Kempe's argument. Counting the original degree ignores neighbours
already removed, so simplify gets stuck early and guesses; `<= K` admits
a node whose K neighbours might take every colour. Each wrong test
spills on a graph that K colours suffice for.
