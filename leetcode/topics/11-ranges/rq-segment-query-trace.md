---
id: rq-segment-query-trace
kind: trace
version: 2
level: 4
tags: [segment-tree, range-queries, tracing, lc-307]
probes:
  1: { s: "16", l: "6" }
  2: { s: "23", r: "3" }
requires:
  - rq-segment-query-worked
  - rq-segment-query-code
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://codeforces.com/blog/entry/18051
elaborate: Which `[l, r)` on these eight leaves makes the loop take the most nodes, and how many is that?
---

Range Sum Query - Mutable (LC 307) asks for `sumRange(1, 6)`, both ends
included: `[1, 7)` here. `t` is the bottom-up tree over `a`: leaves
`t[8..16)`, `t[v] = t[2v] + t[2v + 1]`. The leaf level has already
taken `a[1]` and `a[6]` (s = 9) and moved both ends up a level.
`level` is the next turn of the query loop.

```cpp
int a[8] = {5, 2, 6, 1, 3, 4, 7, 0};
int t[16];   // t[5] = a[2] + a[3] = 7, t[6] = a[4] + a[5] = 7
int l = 5, r = 7, s = 9;

void level() {
  if (l & 1) { s += t[l]; ++l; }   // @1
  if (r & 1) { --r; s += t[r]; }
  l /= 2; r /= 2;                  // @2
}

int main() { level(); }
```

---

Both ends are odd again. `l = 5` is a right child, so `t[5]` (`a[2..4)`,
7) is taken alone. `r = 7` is exclusive and odd, so the node just left
of it, `t[6]` (`a[4..6)`, 7), is taken. s = 23 = 2 + 6 + 1 + 3 + 4 + 7,
and both ends meet at 3: the loop stops.

**Four nodes for six leaves**: the inner part of the range is taken as
whole subtrees, and only the ragged ends cost a node each per level.

Values from compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
