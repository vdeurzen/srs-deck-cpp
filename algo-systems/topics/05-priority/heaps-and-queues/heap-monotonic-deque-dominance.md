---
id: heap-monotonic-deque-dominance
kind: basic
version: 1
level: 4
requires:
  - heap-monotonic-deque
tags: [queues, sliding-window, invariants]
elaborate: Next-greater-element, largest rectangle in a histogram, rolling drawdown on a price feed — what is the dominance relation in each?
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
---

## A sliding-window maximum discards some elements forever, long before they leave the window. What makes discarding one safe?

---

**A younger element at least as large exists: the old one can never be a maximum again.**

Every future window that contains the old element also contains the
younger, larger one. That dominance relation is the whole pattern:
wherever one exists on a stream, the survivors form a monotone sequence a
deque or stack maintains in amortised O(1).
