---
id: complexity-cost-trace-binary-counter
kind: trace
version: 1
level: 2
tags: [foundations, complexity, amortised, tracing]
requires:
  - complexity-cost-amortized
  - interview-essentials/complexity-cost-geometric-sum
probes:
  1: { flips: "15", biggest: "4" }
  2: { flips: "31", biggest: "5" }
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
---

An 8-bit counter stored as an array of bits, `bit[0]` lowest. `flips`
counts every bit written; `biggest` is the most flips one increment
made. Each probe reads both after the loop on its line.

```cpp
int flips = 0, biggest = 0;
void increment(bool* bit, int width) {
  int f = 0, i = 0;
  while (i < width && bit[i]) { bit[i] = false; ++i; ++f; }
  if (i < width) { bit[i] = true; ++f; }
  flips += f;
  if (f > biggest) biggest = f;
}

int main() {
  bool bit[8] = {};
  for (int k = 0; k < 8; ++k) increment(bit, 8);  // @1
  for (int k = 0; k < 8; ++k) increment(bit, 8);  // @2
}
```

---

Per increment: 1, 2, 1, 3, 1, 2, 1, 4 flips (0111 → 1000 is the 4),
total 15; the next eight add 16 more, with 01111 → 10000 costing 5.
Bit 0 flips every time, bit 1 every second time, bit 2 every fourth…
so n increments flip fewer than n + n/2 + n/4 + … < **2n** bits:
amortised 2 per increment, though one increment can flip log n bits.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
