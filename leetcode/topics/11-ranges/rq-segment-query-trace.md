---
id: rq-segment-query-trace
kind: trace
version: 1
level: 4
tags: [segment-tree, range-queries, tracing, lc-307]
probes:
  1: { l: "5", r: "7", s: "9" }
  2: { l: "3", r: "3", s: "23" }
requires:
  - rq-segment-query-code
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://codeforces.com/blog/entry/18051
elaborate: Which `[l, r)` on these eight leaves makes the loop take the most nodes, and how many is that?
---

LC 307's `sumRange(1, 6)` is `[1, 7)` here. `t` is the bottom-up tree
over `a`: leaves `t[8..16)`, `t[v] = t[2v] + t[2v + 1]`. One call of
`level` is one turn of the query loop.

```cpp
int a[8] = {5, 2, 6, 1, 3, 4, 7, 0};
int t[16];   // t[8 + i] = a[i], then t[v] = t[2v] + t[2v + 1]:
             // t[5] = a[2] + a[3] = 7, t[6] = a[4] + a[5] = 7
int l = 1 + 8, r = 7 + 8, s = 0;

void level() {
  if (l & 1) s += t[l++];
  if (r & 1) s += t[--r];
  l /= 2; r /= 2;
}

int main() {
  level();   // @1
  level();   // @2  l == r: the loop stops here
}
```

---

On the leaves, 9 is odd, so `a[1]` (2) is taken; 15 is odd, so leaf 14,
`a[6]` (7), is taken: s = 9. One level up, both ends are odd again:
`t[5]` covers `a[2..4)` (6 + 1) and `t[6]` covers `a[4..6)` (3 + 4).
s = 23 = 2 + 6 + 1 + 3 + 4 + 7.

**Four nodes for six leaves**: the inner part of the range is taken as
whole subtrees, and only the ragged ends cost a node each per level.
