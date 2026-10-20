---
id: dp-grid-paths-faded
kind: trace
version: 1
level: 3
tags: [dynamic-programming, grids, tracing, lc-62]
probes:
  1: { left: "3", last: "6" }
requires:
  - dp-grid-paths-worked
  - dp-grid-dag-signal
elaborate: Say in one sentence, as to an interviewer, what would go wrong if the inner loop ran `j` from right to left.
refs:
  - https://leetcode.com/problems/unique-paths/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

Unique Paths on a 3 × 3 grid, moving only right or down, with one
reused `row`. Grid row 1 is given; work out grid row 2 and read the
probe after both loops.

```cpp
#include <vector>
int main() {
  std::vector<int> row(3, 1);            // grid row 0: 1 1 1
  for (int i = 1; i < 3; ++i)
    for (int j = 1; j < 3; ++j)
      row[j] += row[j - 1];              // grid row 1: 1 2 3
  int left = row[1], last = row[2];      // @1
}
```

---

Grid row 2: `row[1]` = 2 (above) + 1 (left) = 3, then `row[2]` = 3
(above) + 3 (the `row[1]` just written, left) = 6. Six paths reach the
corner. Values from running it under GCC 16.2.
