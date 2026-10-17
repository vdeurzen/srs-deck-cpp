---
id: dp-grid-paths-chunk
kind: chunk
version: 1
level: 2
tags: [dynamic-programming, grids, lc-62, lc-63]
expose_ms: 6000
compile: null # a function body: graded by text, see below
requires:
  - dp-grid-dag-signal
refs:
  - https://leetcode.com/problems/unique-paths/
  - https://leetcode.com/problems/unique-paths-ii/
  - https://leetcode.com/problems/coin-change-ii/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: Coin Change II (LC 518), counting the ways to make `amount` from reusable `coins`, runs the same `x[j] += x[j - step]` line. What plays the role of "the cell above" there?
---

```cpp
std::vector<int> row(n, 1);
for (int i = 1; i < m; ++i)
  for (int j = 1; j < n; ++j)
    row[j] += row[j - 1];
return row[n - 1];
```

---

**Grid paths with one rolling row**: Unique Paths (LC 62), the number of
paths from the top-left to the bottom-right of an `m × n` grid moving
only right or down. Paths into a cell =
paths from above + paths from the left. Before `+=`, `row[j]` still holds
the cell *above*; `row[j - 1]` was already updated, so it is the cell to
the *left*. One row of memory, O(mn) time.

The first row and the first column start at 1: one straight path each,
which is why `i` and `j` start at 1.

Graded by text (`compile: null`); body of `int uniquePaths(int m, int n)`.
The diff is the judge: an equivalent rewrite is marked different, so
compare it line by line and rate yourself.
