---
id: arr-prefix-count-worked
kind: basic
version: 1
level: 2
tags: [prefix-sums, hash-map, worked-example, lc-560]
requires:
  - arr-prefix-hash-signal
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
---

Count the contiguous subarrays of `a = {1, 2, 3}` summing to `k = 3`.
`seen` counts the prefix sums met so far. Seed: the empty prefix 0,
once. Then per `x`: add it to `p`, look up `seen[p − 3]` into `n`,
count `p` in `seen`.

```text
x   p   look up       n   seen after count
—   0   (seed)        0   {0:1}
1   1   seen[−2] = 0  0   {0:1, 1:1}
2   3   seen[0] = 1   1   {0:1, 1:1, 3:1}
3   6   seen[3] = 1   2   {0:1, 1:1, 3:1, 6:1}
```

## At `x = 2`, which subarray does the 1 read from `seen[0]` count?

---

**`{1, 2}`: the stretch after the empty prefix, which the seed put in `seen`.**

A subarray ending at `x` sums to `k` when an earlier prefix equals
`p − k`; the stretch after that prefix is the subarray. Without the
seed, subarrays starting at index 0 are never counted.
