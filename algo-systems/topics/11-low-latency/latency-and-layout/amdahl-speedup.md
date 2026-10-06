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
    static_assert(speedup(0.05, 1'000'000) > 19.9 && speedup(0.05, 1'000'000) < 20.0);
    int main() {}
refs:
  - https://doi.org/10.1145/1465482.1465560
  - https://en.wikipedia.org/wiki/Amdahl%27s_law
---

A fraction `serial` of a job's single-core time cannot run in parallel;
the rest splits perfectly across `cores`. Complete the speed-up over one
core.

```cpp
constexpr double speedup(double serial, int cores) {
  return {{c1::1.0 / (serial + (1.0 - serial) / cores)}};
}
```

---

**New time = serial part + parallel part ÷ cores**, and speed-up is its
reciprocal. As `cores` grows the second term vanishes, so speed-up is
capped at `1 / serial`: 5 % serial means at most 20×, even on a million
cores.

The serial part is rarely visible in the source — it is the lock, the
allocator, the shared queue every thread pops from.
