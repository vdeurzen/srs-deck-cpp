---
id: dp-grid-paths-worked
kind: basic
version: 1
level: 2
tags: [dynamic-programming, grids, worked-example, lc-62]
requires:
  - dp-grid-dag-signal
  - cpp-essentials/vector-sized-constructor
refs:
  - https://leetcode.com/problems/unique-paths/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

## Unique Paths on a 3 × 3 grid: count the paths from top-left to bottom-right moving only right or down. One `row` of 3 counts is reused for every grid row:

```cpp
std::vector<int> row(3, 1);
for (int i = 1; i < 3; ++i)
  for (int j = 1; j < 3; ++j)
    row[j] += row[j - 1];
```

| step | `row` after | sum |
| --- | --- | --- |
| init: grid row 0 | 1 1 1 | one straight path each |
| i = 1, j = 1 | 1 2 1 | 1 + 1 |
| i = 1, j = 2 | 1 2 3 | 1 + 2 |
| i = 2, j = 1 | 1 3 3 | 2 + 1 |
| i = 2, j = 2 | 1 3 6 | 3 + 3 |

At i = 2, j = 2, why does the old `row[2]` count paths from the cell above, while `row[1]` counts paths from the cell to the left?

---

**`row[1]` was already overwritten in this grid row; `row[2]` not yet.**

Before `+=`, `row[2]` still holds grid row 1's value: the cell above.
`row[1]` was updated one step earlier, so it is grid row 2's value: the
cell to the left. Updating left to right gives both neighbours from one
array.
