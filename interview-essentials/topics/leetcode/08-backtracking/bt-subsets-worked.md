---
id: bt-subsets-worked
kind: basic
version: 1
level: 2
tags: [backtracking, subsets, worked-example]
requires:
  - technique-backtracking-undo
refs:
  - https://leetcode.com/problems/subsets/
  - https://doi.org/10.1145/321296.321300
---

Every subset of `{1, 2}`, with one shared list `cur`, starting empty.
A call `subsets(i)` first records a copy of `cur` in `out`. Then, for
each `j` from `i` to the end, it appends item `j`, calls
`subsets(j + 1)`, and removes the last item again.

```text
call          cur on entry   out after recording
subsets(0)    []             []
subsets(1)    [1]            [] [1]
subsets(2)    [1, 2]         [] [1] [1, 2]
subsets(2)    [2]            [] [1] [1, 2] [2]
```

## Why does the last call start with `cur = [2]`, not `[1, 2]`?

---

**After the branch under 1 returned, its removal took 1 back off `cur`.**

Choose, explore, un-choose: `subsets(0)` appended 1, explored everything
below it, then removed it before appending 2. So 2's branch starts from
the state `subsets(0)` had, and [2] is recorded instead of a repeat.
