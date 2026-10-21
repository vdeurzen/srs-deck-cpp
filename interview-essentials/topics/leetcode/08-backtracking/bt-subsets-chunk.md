---
id: bt-subsets-chunk
kind: chunk
version: 2
level: 2
tags: [backtracking, subsets, lc-78]
expose_ms: 11000
compile: null # a function body
requires:
  - bt-subsets-trace
  - technique-backtracking-trace
refs:
  - https://leetcode.com/problems/subsets/
  - https://leetcode.com/problems/permutations/
  - https://doi.org/10.1145/321296.321300
elaborate: Permutations (LC 46), every ordering of distinct `nums`, may place any unused item at every position. What replaces the start index `i`, and which line then needs an un-choose of its own?
---

```cpp
out.push_back(cur);
for (int j = i; j < int(a.size()); ++j) {
  cur.push_back(a[j]);
  subsets(a, j + 1, cur, out);
  cur.pop_back();
}
```

---

Subsets (LC 78): return every subset of an array `nums` of distinct
integers.

**The backtracking template: choose, explore, un-choose.** `cur` is the
path from the root of the decision tree; one shared vector is grown and
shrunk instead of copied at every call. Here every node is an answer,
so it is recorded on entry; problems with a target record only at a
leaf.

The **start index** is what makes these sets and not orderings: the
call continues from `j + 1`, so items are picked in increasing index
order and {1, 2} is never produced again as {2, 1}. 2ⁿ subsets, O(n·2ⁿ)
with the copies. Forgetting `pop_back` leaks a branch's choice into its
siblings. It is the body of `subsets(a, i, cur, out)`, first called with `i = 0`.
