---
id: compiler-critical-path
kind: code
version: 1
level: 4
tags: [compilers, codegen, scheduling, dags]
input: chips
choices:
  c1: ["dag[i].lat + best", "best + 1", "dag[i].lat", "std::max(dag[i].lat, best)"]
compile:
  harness: |
    // 0: load (4) -> 2: add (1) -> 4: store (1);  1: mul (3) -> 2;  3: add (1) -> 4
    constexpr std::array<Ins, 5> kDag{{{4, 0b00100}, {3, 0b00100}, {1, 0b10000}, {1, 0b10000}, {1, 0}}};
    constexpr auto kPrio = priority(kDag);
    static_assert(kPrio[4] == 1 && kPrio[3] == 2 && kPrio[2] == 2);
    static_assert(kPrio[0] == 6 && kPrio[1] == 5);   // the load goes first
    int main() {}
requires:
  - compiler-instruction-scheduling
refs:
  - https://en.wikipedia.org/wiki/Instruction_scheduling
  - https://llvm.org/doxygen/classllvm_1_1SUnit.html
elaborate: Two ready instructions tie on this priority. What would you break the tie on, and why?
---

Compute each instruction's list-scheduling priority. Instructions are
numbered in topological order, so every successor has a higher index;
`lat` is the instruction's latency in cycles.

```cpp
#include <algorithm>
#include <array>
struct Ins { int lat; unsigned succ; };          // bit s: s depends on this
constexpr std::array<int, 5> priority(const std::array<Ins, 5>& dag) {
  std::array<int, 5> prio{};
  for (int i = 4; i >= 0; --i) {                 // successors first
    int best = 0;
    for (int s = i + 1; s < 5; ++s) if (dag[i].succ >> s & 1) best = std::max(best, prio[s]);
    prio[i] = {{c1::dag[i].lat + best}};
  }
  return prio;
}
```

---

**An instruction's own latency plus its longest successor's priority**:
the latency-weighted path from it to the end. The load and the multiply
both feed the add, but the load's longer latency makes it the head of
the critical path. Counting instructions (`best + 1`) ranks them equal;
latency alone, or the maximum, loses the path behind.
