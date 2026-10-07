---
id: technique-knapsack-direction
kind: code
version: 1
level: 3
tags: [dynamic-programming, knapsack]
requires:
  - technique-coin-change-table
input: chips
choices:
  c1:
    - "int w = W; w >= it.weight; --w"
    - "int w = it.weight; w <= W; ++w"
    - "int w = W; w > it.weight; --w"
    - "int w = 0; w <= W; ++w"
compile:
  harness: |
    static_assert(best_value(std::array<Item, 1>{{{2, 3}}}, 6) == 3);
    static_assert(best_value(std::array<Item, 1>{{{6, 7}}}, 6) == 7);
    static_assert(best_value(std::array<Item, 4>{{{5, 10}, {4, 40}, {6, 30}, {3, 50}}}, 10) == 90);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Knapsack_problem#0-1_knapsack_problem
  - https://doi.org/10.1287/opre.5.2.266
---

0/1 knapsack: each item can be packed **at most once**. `dp[w]` is the
best value within weight `w`, updated in place, one item at a time.
Complete the inner loop header.

```cpp
#include <algorithm>
#include <array>
struct Item { int weight, value; };

template <std::size_t N>
constexpr int best_value(std::array<Item, N> items, int W) {
  std::array<int, 64> dp{};
  for (Item it : items)
    for ({{c1::int w = W; w >= it.weight; --w}})
      dp[w] = std::max(dp[w], dp[w - it.weight] + it.value);
  return dp[W];
}
```

---

Going **downwards**, `dp[w − weight]` still holds the value from
*before* this item, so the item is counted once. Going upwards reads a
cell this item already improved and packs it again: that is the
*unbounded* knapsack, giving 9 (three copies) for the first test. Stopping
at `w > weight` misses the exact fit.
