---
id: ll-amdahl-speedup
kind: code
version: 1
level: 2
tags: [concurrency, throughput, scaling]
input: chips
choices:
  c1:
    - "1.0 / (serial + (1.0 - serial) / cores)"
    - "1.0 / ((1.0 - serial) + serial / cores)"
    - "cores * (1.0 - serial)"
    - "cores / (serial + (1.0 - serial))"
compile:
  harness: |
    static_assert(speedup(0.0, 8) == 8.0);
    static_assert(speedup(1.0, 8) == 1.0);
    static_assert(speedup(0.5, 2) > 1.33 && speedup(0.5, 2) < 1.34);
    static_assert(speedup(0.1, 8) > 4.70 && speedup(0.1, 8) < 4.71);
    int main() {}
requires:
  - foundations-amdahl
refs:
  - https://doi.org/10.1145/1465482.1465560
  - https://en.wikipedia.org/wiki/Amdahl%27s_law
---

A feed handler spreads message decoding over `cores` threads, but a
fraction `serial` of each message's single-core time stays in the one
sequencer thread that orders the output. Complete the speed-up over one
core.

```cpp
constexpr double speedup(double serial, int cores) {
  return {{c1::1.0 / (serial + (1.0 - serial) / cores)}};
}
```

---

**New time = serial part + parallel part ÷ cores; speed-up is its
reciprocal.** The cap `1 / serial` is far away; the finite-core number is
what you buy hardware with: 10 % serial on 8 cores is 4.7×, so nearly
half the cores are already wasted. In a latency pipeline the lever is
shrinking the sequencer's work, not adding decoder threads.
