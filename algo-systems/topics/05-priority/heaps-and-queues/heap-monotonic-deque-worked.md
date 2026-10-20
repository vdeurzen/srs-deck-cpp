---
id: heap-monotonic-deque-worked
kind: basic
version: 1
level: 4
tags: [queues, sliding-window, worked-example]
requires:
  - heap-monotonic-deque
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
---

Sliding-window maximum over `3 1 2`, window size 2. The deque holds
indices; it is shown here by their values. Each new element first
pops smaller-or-equal values off the back, then joins; an index that
has left the window comes off the front.

```
i  value  off the back  off the front  deque  max
0  3      —             —              3      —
1  1      —             —              3 1    3
2  2      1             3 (too old)    2      2
```

## Row i = 2: why does 1 leave from the back, although it is not the oldest?

---

**2 arrived later and is larger, so 1 can never be a window maximum again.**

Every later window that still holds 1 also holds 2. Dropping 1 now
keeps the deque's values decreasing from front to back, so the front
is always the maximum.
