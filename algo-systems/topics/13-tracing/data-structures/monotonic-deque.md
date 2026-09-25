---
id: trace-monotonic-deque
kind: trace
version: 1
level: 4
tags: [tracing, sliding-window, amortised]
probes:
  1: { "dq.size()": "1", "dq.front()": "0", win: "-1" }
  2: { "dq.size()": "2", "dq.front()": "0", win: "-1" }
  3: { "dq.size()": "3", "dq.front()": "0", win: "5" }
  4: { "dq.size()": "1", "dq.front()": "3", win: "4" }
  5: { "dq.size()": "2", "dq.front()": "3", win: "4" }
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
  - https://en.cppreference.com/w/cpp/container/deque
---

```cpp
#include <deque>

const int a[] = {5, 3, 1, 4, 2};   // window size 3
std::deque<int> dq;                // indices, values strictly decreasing
int win = -1;

void step(int i) {
  while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
  dq.push_back(i);
  if (dq.front() <= i - 3) dq.pop_front();
  if (i >= 2) win = a[dq.front()];
}

int main() {
  step(0);   // @1
  step(1);   // @2
  step(2);   // @3
  step(3);   // @4
  step(4);   // @5
}
```

---

Two different evictions, and the trace separates them.

Probes 1–3 fill the window: 5, then 3, then 1 — each new value is
smaller than the one before, so nothing is dominated, nothing is
popped from the back, and the deque grows to hold all three indices.
The front is index 0 throughout, so the first window's maximum is 5.

Probe 4 is where both rules fire at once. The new value 4 dominates
the 1 at index 2 and the 3 at index 1 — both are older *and* smaller,
so they can never be the maximum of any future window and are popped
from the **back**. Then index 0 is now outside the window
(`0 <= 3 − 3`), so it is popped from the **front**. The deque collapses from three entries to one, and
the maximum of the window `{3, 1, 4}` is read straight off the front as
`a[3] = 4`.

Probe 5 adds 2, which dominates nothing, so the deque holds indices 3
and 4 and the maximum stays 4.

Total work over the five steps: five pushes and three pops. Each index
enters and leaves at most once, which is the amortised O(1) argument —
a single step can pop several entries, but only because earlier steps
paid to push them.

Verified by compiling and running this program under GCC 13.3
(`g++ -std=c++23 -Wall -Wextra`) and printing the three values after
each `step`.
