---
id: compiler-frontier-runner
kind: code
version: 1
level: 5
tags: [compilers, ssa, dominance]
input: chips
choices:
  c1: ["idom[m]", "m", "idom[p]", "0"]
compile:
  harness: |
    // 0 -> {1, 2} -> 3 -> 4 -> {3, 5}: a diamond, then a loop with header 3.
    constexpr std::array<Edge, 7> kCfg{{{0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}, {4, 3}, {4, 5}}};
    constexpr std::array<int, 6> kIdom{0, 0, 0, 0, 3, 4};
    constexpr Sets kDf = frontiers(kCfg, kIdom);
    static_assert(kDf[1] == 1u << 3 && kDf[2] == 1u << 3);   // the diamond's join
    static_assert(kDf[4] == 1u << 3);                        // the latch reaches the header
    static_assert(kDf[3] == 1u << 3);                        // a loop header is in its own frontier
    static_assert(kDf[0] == 0 && kDf[5] == 0);
    int main() {}
requires:
  - compiler-dominance-frontier
  - compiler-dominator-tree
refs:
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
  - https://dl.acm.org/doi/10.1145/115372.115320
elaborate: The loop never tests whether `m` has two predecessors. What happens on an edge into a block with only one?
---

Compute every dominance frontier from the dominator tree: for each CFG
edge `p → m`, walk up from `p`, adding `m` to each block's frontier.
Complete where the walk stops. Block 0 is the entry, with
`idom[0] == 0`.

```cpp
#include <array>
struct Edge { int p, m; };
using Sets = std::array<unsigned, 6>;   // bit m of df[n]: m is in DF(n)

template <std::size_t E>
constexpr Sets frontiers(const std::array<Edge, E>& cfg, const std::array<int, 6>& idom) {
  Sets df{};
  for (auto [p, m] : cfg)
    for (int run = p; run != {{c1::idom[m]}}; run = idom[run])
      df[run] |= 1u << m;
  return df;
}
```

---

**Stop at `m`'s immediate dominator**: it and everything above it
strictly dominate `m`, so `m` is not in their frontier. Every block from
`p` up to there dominates a predecessor of `m` without strictly
dominating `m`. Stopping at the entry adds `m` to blocks that dominate
it (3 would get 4); stopping at `m` walks past the entry and never ends;
stopping at `idom[p]` misses the header in its own frontier. This is the Cooper–Harvey–Kennedy
formulation.
