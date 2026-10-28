---
id: srch-lower-bound-worked
kind: basic
version: 1
level: 2
tags: [algorithms, searching, worked-example]
requires:
  - srch-lower-bound-insert
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://eel.is/c++draft/lower.bound
---

One way `std::lower_bound(v.begin(), v.end(), 4)` can work on
`v{2, 4, 4, 7, 9}`: it keeps `[lo, hi)`, the indices not yet ruled out.

| `[lo, hi)` | probe the middle | step |
| --- | --- | --- |
| `[0, 5)` | middle `(lo + hi) / 2` = 2: `v[2]` is 4 | not smaller, so keep the middle and the left |
| `[0, 2)` | `v[1]` is 4 | not smaller, so keep the middle and the left |
| `[0, 1)` | `v[0]` is 2 | drop the left half if smaller |
| `[1, 1)` | — | stop when empty: index 1 |

## At row 1, `v[2] == 4`, yet the search keeps going left. Why?

---

**A hit may not be the first 4: one may sit further left.**

`lower_bound` wants the *first* element not less than 4. So an equal
element doesn't end the search: the middle stays as a candidate (`hi`
becomes 2), and the part to its left is still unchecked. Here `v[1]` is
that first 4.
