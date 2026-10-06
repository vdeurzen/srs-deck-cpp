---
id: chunks-monotonic-deque
kind: chunk
version: 1
level: 4
tags: [idioms, sliding-window, amortised]
expose_ms: 7000
compile: null
requires:
  - heap-monotonic-deque
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
  - https://en.cppreference.com/w/cpp/container/deque
---

```cpp
while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
dq.push_back(i);
if (dq.front() <= i - k) dq.pop_front();
window_max = a[dq.front()];
```

---

Sliding-window maximum in amortised O(1) per element. The deque holds
**indices** whose values are strictly decreasing: the first line evicts
everything the newcomer dominates (older *and* smaller — dead forever),
the third drops the front when it falls out of the window, and the
front is therefore always the maximum.

Indices rather than values, so the window test is arithmetic; `<=`
rather than `<` in the eviction, so equal values do not accumulate.
Each index is pushed once and popped once, which is the whole
amortisation argument.

Graded by whitespace-normalised equality (SPEC §4.7): `a`, `dq`, `i`
and `k` belong to the enclosing loop.
