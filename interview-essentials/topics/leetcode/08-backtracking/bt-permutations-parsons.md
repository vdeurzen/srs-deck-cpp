---
id: bt-permutations-parsons
kind: parsons
version: 1
level: 2
tags: [backtracking, permutations, lc-46]
distractors:
  - "  out.push_back(cur);"
  - "    cur.pop_back();"
compile:
  harness: |
    #include <vector>
    constexpr bool orderings() {
      const std::vector<int> a{1, 2, 3};
      std::vector<bool> used(3);
      std::vector<int> cur;
      std::vector<std::vector<int>> out;
      permute(a, used, cur, out);
      const std::vector<std::vector<int>> want{{1, 2, 3}, {1, 3, 2}, {2, 1, 3},
                                               {2, 3, 1}, {3, 1, 2}, {3, 2, 1}};
      return out == want && cur.empty() && used == std::vector<bool>(3);
    }
    static_assert(orderings());
    constexpr bool single() {
      const std::vector<int> a{7};
      std::vector<bool> used(1);
      std::vector<int> cur;
      std::vector<std::vector<int>> out;
      permute(a, used, cur, out);
      return out == std::vector<std::vector<int>>{{7}};
    }
    static_assert(single());
    int main() {}
requires:
  - bt-subsets-chunk
  - cpp-essentials/vector-sized-constructor
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/permutations/
  - https://leetcode.com/problems/permutations-ii/
  - https://doi.org/10.1145/321296.321300
elaborate: Permutations II (LC 47) allows duplicates in `nums` but wants each distinct ordering once. After sorting, which extra condition on `j` skips a copy, and why must it look at whether `a[j - 1]` is used?
---

Permutations (LC 46): return every ordering of an array `nums` of
distinct integers. Order the lines.

```cpp
constexpr void permute(const auto& a, auto& used, auto& cur, auto& out) {
  if (cur.size() == a.size()) { out.push_back(cur); return; }
  for (int j = 0; j < int(a.size()); ++j) {
    if (used[j]) continue;
    used[j] = true; cur.push_back(a[j]);
    permute(a, used, cur, out);
    cur.pop_back(); used[j] = false;
  }
}
```

---

**Permutations: every position may take any unused item, so `j` starts at 0 and `used[]` replaces the start index.**
Choose marks *and* appends; un-choose undoes *both*, in reverse. n!
leaves, O(n · n!) with the copies.

Only full-length paths are answers, so the leaf records and returns.
The first distractor is the subsets habit of recording every node: it
adds the partial orderings too. The second un-chooses only `cur`: the
first leaf leaves every item marked, so [1, 2, 3] is the only ordering
found.
