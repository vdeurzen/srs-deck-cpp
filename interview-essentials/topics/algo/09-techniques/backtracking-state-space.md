---
id: technique-backtracking-state-space
kind: basic
version: 1
level: 2
tags: [backtracking, recursion]
requires:
  - technique-call-stack-worked
  - tree-terms
elaborate: Say aloud what the tree looks like for a problem you know where each level has more than two choices.
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Backtracking
---

## Backtracking for subset sum over {2, 4, 6} (choose some of the items so that they add up to a target) walks a tree of decisions. What is one node of that tree?

---

```
            {}
     take 2/    \skip 2
       {2}        {}
   take 4/ \    /  \      … one level per item
```

**A partial solution: the choices made so far.** Each level decides one
item, take or skip, so 3 items give 2³ = 8 leaves. Backtracking walks
this state-space tree depth-first, keeping only the current path, and
abandons a node as soon as it cannot lead to a solution.
