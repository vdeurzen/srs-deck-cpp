---
id: rq-segment-signal
kind: basic
version: 1
level: 2
tags: [segment-tree, range-queries, recognition, lc-307]
requires:
  - linear-prefix-sum-range
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://cp-algorithms.com/data_structures/segment_tree.html
elaborate: LC 303 is the same query with no updates. Which simpler structure wins there, and what does it cost per query?
---

> Given an integer array `nums`, handle multiple queries: **update** the
> value of an element, and calculate the **sum between indices `left`
> and `right`** inclusive. At most `3 * 10^4` calls in total.

## Which kind of structure makes both operations O(log n)?

---

**A tree of partial results: each node holds the sum of one block of the array.**

An update rewrites only the blocks containing that index, one per level;
a query adds O(log n) blocks that tile the range. A prefix-sum array
answers in O(1) but rewrites O(n) prefixes per update.
