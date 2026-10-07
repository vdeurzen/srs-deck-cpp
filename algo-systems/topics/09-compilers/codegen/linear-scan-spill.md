---
id: compiler-linear-scan-spill
kind: code
version: 1
level: 5
tags: [compilers, codegen, registers, jit]
input: chips
choices:
  c1:
    - "iv[reg[0]].end > iv[reg[1]].end"
    - "iv[reg[0]].end < iv[reg[1]].end"
    - "iv[reg[0]].start < iv[reg[1]].start"
    - "iv[reg[0]].end - iv[reg[0]].start > iv[reg[1]].end - iv[reg[1]].start"
compile:
  harness: |
    constexpr Iv kA[] = {{1, 7}, {6, 9}, {7, 8}, {8, 10}, {9, 14}};
    constexpr Iv kB[] = {{1, 8}, {5, 9}, {6, 7}, {8, 13}, {9, 11}};
    static_assert(spilled(kA) == 0b00010 && spilled(kB) == 0b00010);   // one spill each
    int main() {}
requires:
  - compiler-linear-scan
refs:
  - https://dl.acm.org/doi/10.1145/330249.330250
  - https://doi.org/10.1147/sj.52.0078
elaborate: Belady's rule evicts the cache line used furthest in the future. Why is it only a heuristic for registers, when it is optimal for a cache?
---

Two registers are both busy when interval `i` starts. Complete the
choice of which register's interval to compare against `i` for
eviction.

```cpp
struct Iv { int start, end; };                  // inclusive, sorted by start
constexpr unsigned spilled(const Iv (&iv)[5]) {   // bit i: interval i spilled
  int reg[2] = {-1, -1};                        // interval in each register
  unsigned out = 0;
  for (int i = 0; i < 5; ++i) {
    for (int& r : reg) if (r >= 0 && iv[r].end < iv[i].start) r = -1;   // expire
    if (reg[0] < 0 || reg[1] < 0) { reg[reg[0] < 0 ? 0 : 1] = i; continue; }
    int& v = {{c1::iv[reg[0]].end > iv[reg[1]].end}} ? reg[0] : reg[1];
    if (iv[v].end > iv[i].end) { out |= 1u << v; v = i; } else out |= 1u << i;
  }
  return out;
}
```

---

**Evict the interval that ends furthest away**, or `i` itself if it
ends later still: Belady's rule applied to registers. It frees a
register for the longest stretch, so the fewest later intervals
collide. Evicting the one ending soonest, the oldest, or the longest
spills two intervals on each case here instead of one.
