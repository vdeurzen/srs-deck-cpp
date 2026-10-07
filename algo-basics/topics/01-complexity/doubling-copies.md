---
id: complexity-doubling-copies
kind: trace
version: 1
level: 2
tags: [complexity, amortised, tracing]
requires:
  - complexity-count-loop-steps
probes:
  1: { cap: "8", copies: "7" }
  2: { cap: "16", copies: "15" }
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://epubs.siam.org/doi/10.1137/0606031
---

A model of a growable array: when full, it copies every element into a
block twice the size. Each probe reads the state after its line.

```cpp
int cap = 1, size = 0, copies = 0;
void push() {
  if (size == cap) { copies += size; cap *= 2; }
  ++size;
}

int main() {
  for (int k = 0; k < 8; ++k) push();  // @1
  push();                              // @2
}
```

---

Copies happen at sizes 1, 2, 4, 8: 1 + 2 + 4 = 7 after 8 pushes. The
9th push alone copies 8. Yet seven more pushes copy nothing, so after
16 pushes the total is still 15: the geometric series 1 + 2 + … + n/2 < n. So n pushes cost O(n) in total,
O(1) each **amortised**, even though one push costs O(n).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
