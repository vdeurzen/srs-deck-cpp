---
id: mono-histogram-trace
kind: trace
version: 3
level: 4
tags: [monotonic-stack, stacks, tracing, lc-84]
probes:
  1: { best: "3", st: "1" }
  2: { best: "6", st: "2" }
requires:
  - mono-histogram-worked
  - cpp-essentials/expr-conditional-operator
  - stl-min-max
refs:
  - https://leetcode.com/problems/largest-rectangle-in-histogram/
  - https://leetcode.com/problems/maximal-rectangle/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: Maximal Rectangle (LC 85), the largest rectangle of 1s in a 0/1 matrix, calls this once per row. What are the bar heights for each row?
---

Largest Rectangle in Histogram (LC 84): the largest rectangle area under
bars of heights `h`, each 1 wide. Bar 0 is already on the stack. Write
`st` as its indices, bottom to top, separated by spaces.

```cpp
int h[] = {3, 3, 0};                // trailing 0 flushes the stack
std::vector<int> st{0};             // indices; heights rise bottom to top
int best = 0;

void push_bar(int i) {
  while (!st.empty() && h[st.back()] >= h[i]) {
    int top = h[st.back()]; st.pop_back();
    best = std::max(best, top * (st.empty() ? i : i - st.back() - 1));
  }
  st.push_back(i);
}

int main() {
  push_bar(1);   // @1
  push_bar(2);   // @2
}
```

---

**`>=` pops an equal bar early.** Bar 1 pops the equal bar 0 with
width 1 only (area 3), since nothing lies left of it yet. Bar 1 stays
and later covers both 3s: the sentinel pops it onto an empty stack, so
its width is 2 and the area 6. Without the sentinel, 6 is never
computed.

Values from running it under GCC 16.2.
