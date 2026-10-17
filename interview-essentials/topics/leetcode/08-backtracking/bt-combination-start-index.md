---
id: bt-combination-start-index
kind: code
version: 1
level: 3
tags: [backtracking, combinations, lc-39, lc-40]
input: chips
choices:
  c1: ["j", "j + 1", "i", "i + 1"]
compile:
  harness: |
    constexpr bool sums() {
      V cur;
      std::vector<V> out;
      combos({2, 3, 6, 7}, 0, 7, cur, out);                  // LC 39, example 1
      if (out != std::vector<V>{{2, 2, 3}, {7}}) return false;
      out.clear();
      combos({2, 3, 5}, 0, 8, cur, out);                     // LC 39, example 2
      return out == std::vector<V>{{2, 2, 2, 2}, {2, 3, 3}, {3, 5}} && cur.empty();
    }
    static_assert(sums());
    int main() {}
requires:
  - bt-subsets-chunk
refs:
  - https://leetcode.com/problems/combination-sum/
  - https://leetcode.com/problems/combination-sum-ii/
  - https://doi.org/10.1145/321296.321300
elaborate: LC 40 gives each candidate once, with duplicates in the input. Besides the start index, which skip makes [1, 7] appear once when the input has two 1s?
---

LC 39, Combination Sum: the candidates are distinct, any candidate may
be used any number of times, and each combination must be listed once.
`c` is sorted ascending. Complete the start index of the recursive call.

```cpp
#include <vector>
using V = std::vector<int>;
constexpr void combos(const V& c, int i, int left, V& cur, std::vector<V>& out) {
  if (left == 0) { out.push_back(cur); return; }
  for (int j = i; j < int(c.size()) && c[j] <= left; ++j) {
    cur.push_back(c[j]);
    combos(c, {{c1::j}}, left - c[j], cur, out);
    cur.pop_back();
  }
}
```

---

**`j`: stay on the item just taken (reuse), never go back to an earlier one (no reordered repeats).**
The start index decides what the subtree may still pick.

`j + 1` is the subsets rule and LC 40's: each item at most once, so
[2, 2, 3] is never found. `i` and `i + 1` measure from where the
*parent* started, not from the item just taken: `i` lets a branch go
back to earlier items, so [2, 2, 3] also comes out as [2, 3, 2] and
[3, 2, 2]; `i + 1` both repeats orderings and forbids some reuse. Sorting
lets `c[j] <= left` stop the loop early, since every later candidate is
larger too.
