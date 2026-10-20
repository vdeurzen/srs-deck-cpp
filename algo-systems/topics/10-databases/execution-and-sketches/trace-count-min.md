---
id: db-trace-count-min
kind: trace
version: 2
level: 3
tags: [databases, sketches, tracing]
requires:
  - db-count-min-sketch
  - interview-essentials/stl-min-max
probes:
  1: { e2: "1", e3: "0" }
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
elaborate: A heavy-hitters report lists every key whose estimate is at least 1000. Which kind of mistake can it make, and which can it never make?
---

A count-min sketch with 2 rows of 4 counters. Row 0 hashes a key by
`k % 4`, row 1 by `k / 4 % 4`. Keys 1 and 6 are added; 2 and 3 never are.

```cpp
int c[2][4] = {};
int h0(int k) { return k % 4; }
int h1(int k) { return k / 4 % 4; }
void add(int k) { ++c[0][h0(k)]; ++c[1][h1(k)]; }
int est(int k) { return std::min(c[0][h0(k)], c[1][h1(k)]); }

int main() {
  add(1); add(6);
  int e2 = est(2), e3 = est(3);   // @1
}
```

---

Key 1 fills row 0's counter 1 and row 1's counter 0; key 6 fills row
0's counter 2 and row 1's counter 1. Key 2 maps to row 0's counter 2
(shared with 6) and row 1's counter 0 (shared with 1): **collisions in
every row**, so the minimum still reads 1 for a key never added. Key 3
hits row 0's empty counter 3, and a 0 is always the truth.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
