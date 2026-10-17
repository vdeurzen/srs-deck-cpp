---
id: mono-histogram-trace
kind: trace
version: 1
level: 4
tags: [monotonic-stack, stacks, tracing, lc-84]
probes:
  1: { best: "3", st: "1 2" }
  2: { best: "4", st: "1 4" }
  3: { best: "6", st: "5" }
requires:
  - mono-histogram-bounds
refs:
  - https://leetcode.com/problems/largest-rectangle-in-histogram/
  - https://leetcode.com/problems/maximal-rectangle/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: Maximal Rectangle (LC 85), the largest rectangle of 1s in a 0/1 matrix, calls this once per row. What are the bar heights for each row?
---

Largest Rectangle in Histogram (LC 84): the largest rectangle area under
bars of heights `h`, each 1 wide. Write `st` as its indices,
bottom to top, separated by spaces.

```cpp
int h[] = {3, 1, 3, 2, 2, 0};        // trailing 0 flushes the stack
std::vector<int> st; int best = 0;   // indices; heights rise from bottom to top

void push_bar(int i) {
  while (!st.empty() && h[st.back()] >= h[i]) {
    int top = h[st.back()]; st.pop_back();
    int left = st.empty() ? -1 : st.back();
    best = std::max(best, top * (i - left - 1));
  }
  st.push_back(i);
}

int main() {
  push_bar(0); push_bar(1); push_bar(2);   // @1
  push_bar(3); push_bar(4);                // @2
  push_bar(5);                             // @3
}
```

---

Bar 0 (height 3) pops at bar 1 with nothing lower on its left: 3 × 1.
Bar 2 pops at bar 3: 3 × 1 again.

**`>=` pops an equal bar early.** At bar 4, the equal bar 3 pops with
width 2 only (area 4). Bar 4 stays and later covers the whole run: the
sentinel 0 pops it with `left = 1`, width 3, area 6. Without the
sentinel, 6 is never computed.

Values from compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra -fsanitize=address,undefined`, clean).
