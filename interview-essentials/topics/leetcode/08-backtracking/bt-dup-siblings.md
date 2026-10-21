---
id: bt-dup-siblings
kind: basic
version: 1
level: 2
tags: [backtracking, subsets, duplicates]
requires:
  - bt-subsets-worked
refs:
  - https://leetcode.com/problems/subsets-ii/
  - https://doi.org/10.1145/321296.321300
elaborate: Say in one sentence, as to an interviewer, why the input must be sorted before equal siblings can be spotted.
---

Every subset of the sorted `{1, 2, 2}`, with the subsets template: each
call records `cur`, then tries each later item as the next pick. At the
top level, the picks that start with a 2 record:

```text
pick the first 2   →  [2], [2, 2]
pick the second 2  →  [2]
```

## Which subsets does the second 2's branch add that the first 2's branch has not?

---

**None: the first 2 can pick everything the second 2 can, and more.**

Both start from the same value; the first 2's branch may still pick the
second 2 and all later items. So at one depth, a value equal to the
previous choice only repeats subsets, and is skipped.
