---
id: sort-external-merge-passes
kind: code
version: 1
level: 4
tags: [sorting, databases, external-memory]
input: chips
choices:
  c1: ["(runs + k - 1) / k", "runs / k", "runs / (k + 1)", "(runs + 1) / 2"]
compile:
  harness: |
    constexpr std::uint64_t MB = 1ull << 20, GB = 1ull << 30, TB = 1ull << 40;
    static_assert(total_passes(TB, 8 * GB, 8 * MB) == 2);
    static_assert(total_passes(TB, 8 * GB, 64 * MB) == 3);
    static_assert(total_passes(TB, 64 * MB, 8 * MB) == 6);
    int main() {}
requires:
  - sort-external-fan-in
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
---

Run generation leaves `runs` sorted runs; each merge pass combines up
to `k` runs into one. Complete the update so `total_passes` counts every
pass over the data.

```cpp
#include <cstdint>
constexpr int total_passes(std::uint64_t data, std::uint64_t mem,
                           std::uint64_t buf) {
  std::uint64_t runs = (data + mem - 1) / mem;  // pass 1: run generation
  const std::uint64_t k = mem / buf - 1;        // one buffer is the output
  int passes = 1;
  while (runs > 1) { runs = {{c1::(runs + k - 1) / k}}; ++passes; }
  return passes;
}
```

---

A merge pass turns `runs` runs into ⌈runs ÷ k⌉, so the merge depth is
⌈log_k runs⌉. Rounding down (`runs / k`) loses the leftover runs:
128 runs at k = 127 is two runs, not one, and that second merge is a
whole extra read and write. `runs / (k + 1)` forgets the output buffer;
halving is a binary merge, 7 passes where 1 will do. 1 TB with only
64 MB of memory still needs just 6 passes: the log's base is k.
