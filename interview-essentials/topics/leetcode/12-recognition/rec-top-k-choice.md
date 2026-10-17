---
id: rec-top-k-choice
kind: basic
version: 1
level: 4
tags: [heaps, top-k, counting, recognition, lc-703, lc-347]
requires:
  - sort-counting-idea
  - stl-pq-min-heap-type
  - heap-shape-and-order
refs:
  - https://leetcode.com/problems/kth-largest-element-in-a-stream/
  - https://leetcode.com/problems/top-k-frequent-elements/
  - https://leetcode.com/problems/k-closest-points-to-origin/
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
elaborate: K Closest Points to Origin (LC 973) returns the `k` points nearest (0, 0), in any order; every point is in memory and squared distances reach 2·10⁸. Which property is missing, and what does `nth_element` offer instead?
---

Two "best k" statements:

> (a) Design a class that returns the k-th largest score after each
> new score is added.
>
> (b) Given `nums` of length n, return the k most frequent elements,
> in any order.

## For each, what property of its data lets you beat sorting everything?

---

**(a) only the k best so far matter; (b) every count is an integer in 1..n.**

(a) A size-k min-heap: a new score competes with the root alone,
O(log k). (b) Bucket `i` holds the values seen `i` times; read the
buckets from n down until k values are taken: O(n), no comparison sort.
