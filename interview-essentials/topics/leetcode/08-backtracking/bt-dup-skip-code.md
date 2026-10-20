---
id: bt-dup-skip-code
kind: code
version: 1
level: 3
tags: [backtracking, subsets, duplicates, lc-90, lc-40]
input: chips
choices:
  c1: ["j > i", "j > 0", "j >= i", "j > i + 1"]
compile:
  harness: |
    #include <initializer_list>
    #include <vector>
    using V = std::vector<int>;
    using IL = std::initializer_list<std::initializer_list<int>>;   // g142 rejects nested
    constexpr bool power_set(const V& a, IL want) {                 // vector braces here
      V cur;
      std::vector<V> out;
      subsets(a, 0, cur, out);
      std::vector<V> w;
      for (auto s : want) w.emplace_back(s);
      return out == w && cur.empty();
    }
    static_assert(power_set({1, 2, 2}, {{}, {1}, {1, 2}, {1, 2, 2}, {2}, {2, 2}}));   // LC 90
    static_assert(power_set({0}, {{}, {0}}));
    static_assert(power_set({1, 1, 1}, {{}, {1}, {1, 1}, {1, 1, 1}}));
    int main() {}
requires:
  - bt-combination-start-index
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/subsets-ii/
  - https://leetcode.com/problems/combination-sum-ii/
  - https://leetcode.com/problems/combination-sum/
  - https://doi.org/10.1145/321296.321300
elaborate: Combination Sum II (LC 40, combinations of `candidates` summing to `target`, each used at most once, duplicates in the input) adds this skip to the loop that solves Combination Sum (LC 39, the same with distinct, reusable candidates). Which other line of that loop changes, and why does the skip still need sorting?
---

> Given an integer array `nums` that **may contain duplicates**, return
> all possible subsets. The solution set **must not contain duplicate
> subsets**.

That is Subsets II (LC 90). `a` is `nums` sorted, so equal values sit
side by side. Complete the condition that skips a repeated value.

```cpp
constexpr void subsets(const auto& a, int i, auto& cur, auto& out) {
  out.push_back(cur);
  for (int j = i; j < int(a.size()); ++j) {
    if ({{c1::j > i}} && a[j] == a[j - 1]) continue;
    cur.push_back(a[j]);
    subsets(a, j + 1, cur, out);
    cur.pop_back();
  }
}
```

---

**`j > i`: skip a copy only if it is not this depth's first choice.**
At one depth, two equal values would root identical subtrees, so only
the first is tried. The first candidate at a depth (`j == i`) is always
allowed, even when it equals the item the parent just took: that is how
[2, 2] gets built.

On `{1, 2, 2}`: `j > 0` compares across depths, so [2, 2] and
[1, 2, 2] are never produced. `j >= i` skips even the first choice when it equals the parent's item,
so [2, 2] is lost (and it reads `a[-1]` at `j = 0`). `j > i + 1` lets a
second copy through when it sits right after the first choice, so
[1, 2] comes out twice.
