---
id: hash-triangular-probe
kind: code
version: 1
level: 3
tags: [hashing, open-addressing]
requires:
  - hash-quadratic-probing
input: chips
choices:
  c1:
    - "h + i * (i + 1) / 2"
    - "h + i * i"
    - "h + i"
    - "h + i * (i + 1)"
compile:
  harness: |
    static_assert(probe(5, 0) == 5 && probe(5, 1) == 6);
    static_assert(probe(5, 2) == 8 && probe(5, 3) == 11);
    constexpr bool visits_every_slot(int h) {
      bool seen[N]{};
      for (int i = 0; i < N; ++i) seen[probe(h, i)] = true;
      for (bool s : seen) if (!s) return false;
      return true;
    }
    static_assert(visits_every_slot(0) && visits_every_slot(5) && visits_every_slot(15));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Quadratic_probing
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h
---

Quadratic probing in a 16-slot table: each step goes one slot further
than the step before (+1, then +2, then +3 …). Complete the `i`-th probe
position so the first 16 probes visit all 16 slots.

```cpp
constexpr int N = 16;                     // a power of two
constexpr int probe(int h, int i) {       // i = 0, 1, 2, …
  return ({{c1::h + i * (i + 1) / 2}}) & (N - 1);
}
```

---

Steps of 1, 2, 3 … sum to the **triangular numbers** `i(i+1)/2`: offsets
0, 1, 3, 6, 10. For a power-of-two table they hit every slot exactly once
in the first `N` probes, so an insert always finds a free slot.

`h + i*i` is the textbook "quadratic" and fails that: modulo 16, squares
take only four values (0, 1, 4, 9), so a probe can cycle while the table
still has holes. `h + i*(i+1)` only ever adds even offsets, reaching half
the table. Abseil probes *groups* with exactly this triangular sequence.
