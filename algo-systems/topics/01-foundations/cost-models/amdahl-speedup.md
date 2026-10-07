---
id: foundations-amdahl-speedup
kind: code
version: 1
level: 4
tags: [cost-model, throughput, concurrency, measurement]
requires:
  - foundations-amdahl
input: chips
choices:
  c1:
    - "(1.0 / speedup - 1.0 / cores) / (1.0 - 1.0 / cores)"
    - "1.0 / speedup"
    - "(cores - speedup) / cores"
    - "1.0 / speedup - 1.0 / cores"
compile:
  harness: |
    static_assert(serial_fraction(8, 8) == 0.0);     // perfect scaling
    static_assert(serial_fraction(1, 8) == 1.0);     // no scaling at all
    static_assert(serial_fraction(5, 8) > 0.085 && serial_fraction(5, 8) < 0.086);
    int main() {}
refs:
  - https://doi.org/10.1145/78607.78614
  - https://doi.org/10.1145/1465482.1465560
---

A benchmark runs 5× faster on 8 cores than on 1. Amdahl's law gives
speedup from a serial fraction; invert it to read the serial fraction
off the measurement. Complete it.

```cpp
constexpr double serial_fraction(double speedup, double cores) {
  return {{c1::(1.0 / speedup - 1.0 / cores) / (1.0 - 1.0 / cores)}};
}
```

---

Solve `1/speedup = s + (1 − s)/cores` for `s`: the Karp–Flatt metric.
5× on 8 cores means about 8.6 % serial, so no core count beats ~11.7×.
Measure it at several core counts: if `s` *grows* with cores, the cost
is contention (a lock, a shared line), not fixed serial work.
