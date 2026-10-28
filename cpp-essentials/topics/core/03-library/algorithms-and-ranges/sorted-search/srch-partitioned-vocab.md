---
id: srch-partitioned-vocab
kind: basic
version: 1
level: 1
tags: [algorithms, searching]
requires:
  - stdalgo-find-vs-find-if
elaborate: Say why every sorted range is partitioned by `e < x`, whatever `x` is.
refs:
  - https://eel.is/c++draft/alg.sorting.general
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

Some standard search algorithms have a precondition, a condition the
caller must make true before the call: the range must be *partitioned*
with respect to the test `e < 4`, applied to each element `e`.

## Which of these ranges meets it: `{1, 3, 7, 2}` or `{1, 3, 2, 7}`?

---

**`{1, 3, 2, 7}`: every element passing `e < 4` precedes every failing one.**

Partitioned means one block of passes, then one block of fails; the order
inside each block doesn't matter, so the range needn't be sorted. In
`{1, 3, 7, 2}` the passing 2 comes after the failing 7.
