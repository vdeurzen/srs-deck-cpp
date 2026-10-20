---
id: arr-prefix-hash-worked
kind: basic
version: 1
level: 3
tags: [prefix-sums, hash-map, lc-560, worked-example]
requires:
  - interview-essentials/arr-prefix-hash-signal
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
---

Subarray Sum Equals K: count the contiguous subarrays summing to `k`.
Here on `a = {1, 1, 1}`, `k = 2`. `seen` counts the prefix sums met so
far, starting with the empty prefix, 0. Each turn adds `a[i]` to `p`,
adds `seen[p − k]` to `n`, then counts `p`.

```
i  p  p − k  seen[p − k]  n  seen after
—  0  —      —            0  {0:1}
0  1  −1     0            0  {0:1, 1:1}
1  2  0      1            1  {0:1, 1:1, 2:1}
2  3  1      1            2  {0:1, 1:1, 2:1, 3:1}
```

## Row i = 1: which subarray does the 1 read from `seen[0]` count?

---

**`{1, 1}`, from index 0: prefix 0 is the empty prefix before `a[0]`.**

A subarray ending at `i` sums to `k` when an earlier prefix equals
`p − k`; the stretch after that prefix is the subarray. Seeding
`seen[0] = 1` lets the subarrays that start at index 0 count.
