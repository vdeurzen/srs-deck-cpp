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
    #include <vector>
    using V = std::vector<int>;
    constexpr bool sums() {
      V cur;
      std::vector<V> out;
      combos(V{2, 3, 6, 7}, 0, 7, cur, out);                 // LC 39, example 1
      if (out != std::vector<V>{{2, 2, 3}, {7}}) return false;
      out.clear();
      combos(V{2, 3, 5}, 0, 8, cur, out);                    // LC 39, example 2
      return out == std::vector<V>{{2, 2, 2, 2}, {2, 3, 3}, {3, 5}} && cur.empty();
    }
    static_assert(sums());
    int main() {}
requires:
  - bt-subsets-chunk
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/combination-sum/
  - https://leetcode.com/problems/combination-sum-ii/
  - https://doi.org/10.1145/321296.321300
elaborate: Combination Sum II (LC 40) allows each candidate at most once, and its input may hold duplicates. Which of `j` and `j + 1` does it recurse from, and what new problem do the duplicates add?
---

Combination Sum (LC 39): list every combination of distinct `c` that
sums to `target`, each value usable any number of times; [2, 3] and
[3, 2] are one combination. Complete the start index of the recursive
call.

```cpp
constexpr void combos(const auto& c, int i, int left, auto& cur, auto& out) {
  if (left < 0) return;
  if (left == 0) { out.push_back(cur); return; }
  for (int j = i; j < int(c.size()); ++j) {
    cur.push_back(c[j]);
    combos(c, {{c1::j}}, left - c[j], cur, out);
    cur.pop_back();
  }
}
```

---

**`j`: the next pick may reuse the item just taken, but not an earlier one.**
The start index decides what the subtree may still pick.

`j + 1` allows each item at most once, so {2, 3, 6, 7} with target 7
never finds [2, 2, 3]. `i` and `i + 1` measure from where the *parent*
started: `i` lets a branch go back to earlier items, so [2, 2, 3] also
comes out as [2, 3, 2] and [3, 2, 2]. With `c` sorted, the loop can
also stop once `c[j] > left`.
