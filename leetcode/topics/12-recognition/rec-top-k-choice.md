---
id: rec-top-k-choice
kind: basic
version: 1
level: 4
tags: [heaps, top-k, counting, recognition, lc-703, lc-347]
requires:
  - algo-systems/heap-top-k-min-heap
  - algo-basics/sort-counting-idea
refs:
  - https://leetcode.com/problems/kth-largest-element-in-a-stream/
  - https://leetcode.com/problems/top-k-frequent-elements/
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
elaborate: LC 973 (k closest points, any order) has every point in memory and real-valued distances. Which property is missing, and what does `nth_element` offer instead?
---

Two "best k" statements:

> (a) Design a class that returns the k-th largest score after each
> new score is added.
>
> (b) Given `nums` of length n, return the k most frequent elements,
> in any order.

## Which property of each one's data lets you beat sorting everything: O(log k) per score in (a), O(n) in (b)?

---

**(a) only the k best so far matter; (b) every count is an integer in 1..n.**

(a) A size-k min-heap: a new score competes with the root alone.
(b) Bucket `i` holds the values seen `i` times; read the buckets from n
down until k values are taken. No comparison sort is needed.
