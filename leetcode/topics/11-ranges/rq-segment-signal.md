---
id: rq-segment-signal
kind: basic
version: 1
level: 2
tags: [range-queries, recognition, lc-307]
requires:
  - interview-essentials/linear-prefix-sum-range
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://leetcode.com/problems/range-sum-query-immutable/
  - https://cp-algorithms.com/data_structures/segment_tree.html
  - https://cp-algorithms.com/data_structures/fenwick.html
elaborate: Range Sum Query - Immutable (LC 303) is the same query with no updates. Which simpler structure wins there, and what does it cost per query?
---

> Given an integer array `nums`, handle multiple queries: **update** the
> value of an element, and calculate the **sum between indices `left`
> and `right`** inclusive. At most `3 * 10^4` calls in total.

## Which kind of structure makes both operations O(log n)?

---

**A segment tree or a Fenwick tree: each node holds the sum of one block.**

An update rewrites only the O(log n) blocks containing that index; a
query adds O(log n) blocks that tile the range. A prefix-sum array
answers in O(1) but rewrites O(n) prefixes per update.
