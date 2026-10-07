---
id: hash-probe-cliff
kind: cloze
version: 1
level: 4
requires:
  - hash-load-factor-and-probes
tags: [hashing, complexity, open-addressing]
refs:
  - https://abseil.io/about/design/swisstables
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h
---

Abseil's Swiss tables grow before the load factor passes
{{c1::7/8::a fraction}}, far higher than the 0.5–0.75 a plain
linear-probing table can afford.

---

The miss-cost formula counts probes, not cache misses: one SIMD compare
tests a 16-slot group sharing a line, so the ~32 probes a miss "costs"
at 7/8 are a couple of group loads. (`CapacityToGrowth` in
`raw_hash_set.h` returns `capacity * 7 / 8` for all but tiny tables.)
