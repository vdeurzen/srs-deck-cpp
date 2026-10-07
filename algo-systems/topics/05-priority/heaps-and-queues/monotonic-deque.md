---
id: heap-monotonic-deque
kind: basic
version: 1
level: 4
requires:
  - heap-vocabulary
  - seq-vector-vs-deque
tags: [queues, sliding-window, low-latency, amortised]
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
---

## Sliding-window maximum over a stream: why is a deque O(n) total where a heap is O(n log n)?

---

**The deque keeps only candidates, and each index enters and leaves it once.**

It holds indices with strictly decreasing values; a newcomer pops every
smaller-or-equal value at the back. That is O(1) amortised per element. A heap
must keep every element until it expires — it cannot cheaply delete the
one leaving the window — paying O(log n) per step.
