---
id: tree-explain-lca
kind: explain
version: 3
level: 3
tags: [trees, recognition, lc-236, lc-235]
requires:
  - tree-lca-chunk
  - tree-lca-bst
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
  - https://cp-algorithms.com/graph/lca.html
elaborate: Where else does a tree question ask what two nodes share, such as the nearest common directory of two paths or the merge base of two git commits?
---
An interviewer says: in a directory tree where each folder holds at
most two entries (subfolders or files), two files sit somewhere; find
the closest folder that contains both. Talk it through. Answer aloud.
---
- [ ] Recurse from the root in postorder: each folder first collects what both children's subtrees report
- [ ] A report is nothing, one of the two files, or a folder already found to contain both
- [ ] A folder where both children report a file is the answer, and it reports itself upward
- [ ] A folder with only one non-empty report passes it up unchanged, so the root returns the answer
- [ ] That is O(n) time for n folders and files, each visited once, with stack as deep as the tree
