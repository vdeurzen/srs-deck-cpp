---
id: rec-top-k-choice
kind: basic
version: 2
level: 4
tags: [recognition, lc-703, lc-347]
requires:
  - sort-counting-idea
  - heap-op-costs
  - hashing-direct-address-limit
refs:
  - https://leetcode.com/problems/kth-largest-element-in-a-stream/
  - https://leetcode.com/problems/top-k-frequent-elements/
  - https://leetcode.com/problems/k-closest-points-to-origin/
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
elaborate: K Closest Points to Origin (LC 973) returns the `k` points nearest (0, 0), in any order; every point is in memory and squared distances reach 2·10⁸. Which property is missing, and what does `nth_element` offer instead?
---

Two "best k" statements:

> (a) Design a class that returns the k-th largest score after each
> new score is added (its `add` is called once per score).
>
> (b) Given `nums` of length n, return the k most frequent elements,
> in any order.

## One of them can be solved without ever comparing two elements. What property of its data allows that?

---

**(b): every count lies in 1..n, so a count can index a bucket.**

Bucket `i` holds the values seen `i` times; read the buckets from n
down until k values are taken: O(n). (a)'s scores have no bounded range
and keep arriving, so it keeps a size-k min-heap: a new score competes
with the root alone, O(log k).
