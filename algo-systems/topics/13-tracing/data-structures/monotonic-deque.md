---
id: trace-monotonic-deque
kind: trace
version: 3
level: 4
tags: [tracing, sliding-window, amortised]
probes:
  1: { "dq.size()": "1", win: "4" }
  2: { "dq.size()": "2", "dq.front()": "3" }
requires:
  - heap-monotonic-deque-worked
  - heap-monotonic-deque-dominance
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
  - https://en.cppreference.com/w/cpp/container/deque
elaborate: Say aloud how this loop changes to give the sliding-window minimum, and which comparison flips.
---

```cpp
const int a[] = {5, 3, 1, 4, 2};   // window size 3
std::deque<int> dq{0, 1, 2};       // indices after steps 0-2: values 5, 3, 1
int win = 5;

void step(int i) {
  while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
  dq.push_back(i);
  if (dq.front() <= i - 3) dq.pop_front();
  win = a[dq.front()];
}

int main() {
  step(3);   // @1
  step(4);   // @2
}
```

---

Two different evictions, and probe 1 fires both. The new value 4
dominates the 1 at index 2 and the 3 at index 1 — older *and* smaller,
so never a future maximum — and both leave from the **back**. Index 0
is now outside the window (`0 <= 3 − 3`) and leaves from the **front**.
Three entries collapse to one, index 3, and the maximum of
`{3, 1, 4}` is read off the front: `a[3] = 4`.

Probe 2 adds 2, which dominates nothing: indices 3 and 4 remain and the
maximum stays 4. Each index enters and leaves at most once — the
amortised O(1) argument.

Verified by compiling and running this program (with `<deque>`) under
GCC 16.2 and printing the probed values after each `step`.
