---
id: technique-knapsack-direction
kind: code
version: 1
level: 3
tags: [dynamic-programming, knapsack]
requires:
  - technique-coin-change-table
  - stl-min-max
  - cpp-essentials/class-struct-members
elaborate: Say aloud which other in-place table update you know whose loop direction decides whether an item is reused.
input: chips
choices:
  c1:
    - "int w = W; w >= it.weight; --w"
    - "int w = it.weight; w <= W; ++w"
    - "int w = W; w > it.weight; --w"
    - "int w = 0; w <= W; ++w"
compile:
  harness: |
    static_assert(best_value(std::vector<Item>{{2, 3}}, 6) == 3);
    static_assert(best_value(std::vector<Item>{{6, 7}}, 6) == 7);
    static_assert(best_value(std::vector<Item>{{5, 10}, {4, 40}, {6, 30}, {3, 50}}, 10) == 90);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Knapsack_problem#0-1_knapsack_problem
  - https://doi.org/10.1287/opre.5.2.266
---

0/1 knapsack: pack items of total weight ≤ `W` for the most total value,
each item **at most once**. `dp[w]` is the best value within weight `w`,
updated in place, one item at a time.
Complete the inner loop header.

```cpp
#include <algorithm>
#include <vector>
struct Item { int weight; int value; };

constexpr int best_value(std::vector<Item> items, int W) {
  std::vector<int> dp(W + 1);
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
*unbounded* knapsack: one item (weight 2, value 3) with `W` = 6 gives
9, three copies, instead of 3. Stopping
at `w > weight` misses the exact fit.
