---
id: db-trace-count-min
kind: trace
version: 1
level: 3
tags: [databases, sketches, tracing]
requires:
  - db-count-min-sketch
probes:
  1: { e1: "1", e5: "2" }
  2: { e1: "2", e5: "2", e6: "1", e13: "0" }
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
---

A count-min sketch with 2 rows of 4 counters. Row 0 hashes by `k % 4`,
row 1 by `k / 4 % 4`.

```cpp
int c[2][4] = {};
int h(int row, int k) { return row == 0 ? k % 4 : k / 4 % 4; }
void add(int k) { for (int r = 0; r < 2; ++r) ++c[r][h(r, k)]; }
int est(int k) { return std::min(c[0][h(0, k)], c[1][h(1, k)]); }

int main() {
  add(1); add(5); add(5);
  int e1 = est(1), e5 = est(5);                                // @1
  add(2); add(9);
  e1 = est(1); e5 = est(5); int e6 = est(6), e13 = est(13);   // @2
}
```

---

Keys 1, 5 and 9 share row 0's counter 1, which reaches 4. At probe 1
row 1 still separates 1 from 5, so both are exact. Adding 2 lands in
row 1's counter 0 with key 1, so key 1 now reads 2: inflated in both
rows at once. Key 6 was never added but collides with 2 and with 5,
reading 1. Key 13 hits an empty counter in row 1: a 0 is always the
truth. Verified by compiling and running an instrumented copy under
GCC 16.2 (`g++ -std=c++23 -Wall -Wextra`).
