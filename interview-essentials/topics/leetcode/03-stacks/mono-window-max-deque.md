---
id: mono-window-max-deque
kind: basic
version: 1
level: 3
tags: [stacks, windows, lc-239]
requires:
  - mono-stack-signal
  - linear-sequence-containers
refs:
  - https://leetcode.com/problems/sliding-window-maximum/
  - https://en.cppreference.com/w/cpp/container/deque
elaborate: Say in one sentence, as to an interviewer, why each index still costs O(1) amortised although it may now leave from either end.
---

For each day, the next warmer day: a stack of waiting indices, whose
temperatures never rise from bottom to top. A new problem keeps the same
candidates for the maximum of each window of `k` consecutive values,
`n ≤ 10^5`:

```text
a = 5 3 4 1,  k = 3      window 5 3 4 → max 5
                         window 3 4 1 → max 4
```

## Sliding from the first window to the second, what must happen to index 0 (value 5) that a stack cannot do?

---

**It must leave from the bottom, the oldest end: so a deque, not a stack.**

Index 0 is still the largest candidate, so no arriving value pops it
from the top; it expires because the window moved past it. Arrivals pop
at the back, expiry removes at the front: `std::deque` does both in O(1).
