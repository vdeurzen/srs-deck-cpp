---
id: heap-monotonic-deque
kind: basic
version: 1
level: 4
tags: [queues, sliding-window, low-latency, amortised]
refs:
  - https://en.wikipedia.org/wiki/Sliding_window_protocol
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
---

## Sliding-window maximum over a stream: why is a deque O(n) total where a heap is O(n log n)?

---

Keep a deque of **indices whose values are strictly decreasing**. For
each new element: pop from the back while the back's value is ≤ the new
value (those can never be the maximum again — the newcomer is bigger
*and* younger), push the new index at the back, then pop from the front
if it has fallen out of the window. The front is always the window's
maximum.

Every index is pushed once and popped once, so the total work is O(n)
and the **amortised** cost is O(1) per element even though a single step
can pop many. A heap, by contrast, must keep every element until it
expires — you cannot cheaply delete the element leaving the window — so
it either carries stale entries (lazy deletion, O(log n) per step) or
needs handles.

The key insight to carry away is the *domination* argument: an element
that is both older and smaller than another is dead, permanently. Any
time you can define such a dominance relation on a stream, the surviving
set is a monotone sequence and a deque maintains it in amortised O(1).

The same skeleton solves a family of problems: next-greater-element
(monotonic stack), the largest rectangle in a histogram, maximum of all
subarrays of size k, and — the one that matters on a trading desk —
rolling max/min/drawdown over a time window, where the alternative is
recomputing over the window every tick.

The implementation detail that matters in a hot path: store **indices**,
not values, so the window check is arithmetic on the index rather than a
search, and use a fixed-capacity ring buffer rather than `std::deque`,
since the deque can never hold more than the window's worth of entries.
