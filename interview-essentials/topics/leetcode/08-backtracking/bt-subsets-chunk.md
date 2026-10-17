---
id: bt-subsets-chunk
kind: chunk
version: 1
level: 2
tags: [backtracking, subsets, lc-78]
expose_ms: 8000
compile:
  harness: |
    #include <vector>
    constexpr bool power_set() {
      const std::vector<int> a{1, 2, 3};
      std::vector<int> cur;
      std::vector<std::vector<int>> out;
      subsets(a, 0, cur, out);
      const std::vector<std::vector<int>> want{{}, {1}, {1, 2}, {1, 2, 3}, {1, 3}, {2}, {2, 3}, {3}};
      return out == want && cur.empty();
    }
    static_assert(power_set());
    int main() {}
requires:
  - technique-backtracking-undo
refs:
  - https://leetcode.com/problems/subsets/
  - https://doi.org/10.1145/321296.321300
elaborate: LC 46 (permutations) may place any unused item at every position. What replaces the start index `i`, and which line then needs an un-choose of its own?
---

```cpp
constexpr void subsets(const auto& a, int i, auto& cur, auto& out) {
  out.push_back(cur);                        // every node of the tree is a subset
  for (int j = i; j < int(a.size()); ++j) {
    cur.push_back(a[j]);                     // choose
    subsets(a, j + 1, cur, out);             // explore: only items after j
    cur.pop_back();                          // un-choose
  }
}
```

---

**The backtracking template: choose, explore, un-choose.** `cur` is the
path from the root of the decision tree; one shared vector is grown and
shrunk instead of copied at every call. Here every node is an answer,
so it is recorded on entry; problems with a target record only at a
leaf.

The **start index** is what makes these sets and not orderings: the
call continues from `j + 1`, so items are picked in increasing index
order and {1, 2} is never produced again as {2, 1}. 2ⁿ subsets, O(n·2ⁿ)
with the copies. Forgetting `pop_back` leaks a branch's choice into its
siblings.
