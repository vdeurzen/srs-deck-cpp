---
id: tree-lca-worked
kind: basic
version: 1
level: 2
tags: [trees, worked-example]
requires:
  - tree-traversal-orders
  - technique-call-stack-worked
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://doi.org/10.1145/800125.804056
---

The lowest common ancestor (LCA) of `p = 5` and `q = 2` is the deepest
node with both in its subtree, a node counting as in its own. Both are
promised to be in the tree. A call `lca(n)` returns `n` at once if `n`
is `p` or `q`. Otherwise it asks both children, returns `n` if both
report a node, else passes up whichever report is not "none".

```text
        3          call     left     right    returns
       / \         lca(5)   —        —        5: it is p
      5   1        lca(1)   none     none     none
     / \           lca(3)   5        none     5
    6   2
```

## Why may `lca(5)` return 5 without looking below it, though `q = 2` is there?

---

**Either `q` is below 5, so 5 is the LCA, or the split lies higher.**

Had `q` been elsewhere, some ancestor would get a report from each side
and return itself instead. Here nothing else reports, so 5 passes up
unchanged: the root returns 5, the answer.
