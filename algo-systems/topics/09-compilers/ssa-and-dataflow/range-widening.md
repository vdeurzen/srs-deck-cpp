---
id: compiler-range-widening
kind: code
version: 1
level: 4
tags: [compilers, dataflow, lattices, abstract-interpretation]
input: chips
choices:
  c1:
    - "f.lo < old.lo ? -kInf : old.lo, f.hi > old.hi ? kInf : old.hi"
    - "-kInf, kInf"
    - "std::min(old.lo, f.lo), std::max(old.hi, f.hi)"
    - "f.lo < old.lo ? -kInf : f.lo, f.hi > old.hi ? kInf : f.hi"
compile:
  harness: |
    // i = 0; while (i < 10) ++i;  the loop header sees [0,0], then [0,1], ...
    static_assert(widen({0, 0}, {0, 1}) == Range{0, kInf});   // grew up: jump to +inf
    static_assert(widen({0, 5}, {0, 5}) == Range{0, 5});      // stable stays put
    static_assert(widen({0, 9}, {0, 5}) == Range{0, 9});      // never shrinks
    static_assert(widen({0, 0}, {-1, 0}) == Range{-kInf, 0}); // grew down
    int main() {}
requires:
  - compiler-worklist-dataflow
refs:
  - https://dl.acm.org/doi/10.1145/512950.512973
  - https://llvm.org/doxygen/classllvm_1_1ConstantRange.html
elaborate: Widening throws away the bound `i < 10` gave you. Where would you want that precision back?
---

Value-range analysis has infinite height: a loop counter's range grows
`[0,0]`, `[0,1]`, `[0,2]`, … and the fixpoint loop never ends. Complete
the widening operator applied at the loop header, where `old` is the
previous range and `f` the newly computed one.

```cpp
#include <algorithm>
#include <limits>

struct Range {
  long long lo, hi;
  constexpr bool operator==(const Range&) const = default;
};
inline constexpr long long kInf = std::numeric_limits<long long>::max();

constexpr Range widen(Range old, Range f) {
  return Range({{c1::f.lo < old.lo ? -kInf : old.lo, f.hi > old.hi ? kInf : old.hi}});
}
```

---

**Widening** jumps a bound that is still moving straight to infinity and
leaves a bound that held still alone. Each bound can jump at most once, so
the iteration terminates in a couple of rounds: the finite-height
hypothesis that `compiler-worklist-dataflow` needs, recovered by force.

The distractors are the real mistakes. Widening both ends unconditionally
terminates but loses `i ≥ 0`, so a bounds check can never be removed.
The plain join (`min`/`max`) is correct but never terminates on a loop.
Keeping `f`'s stable bound can shrink the result below `old`, but a
widening must be an upper bound of both its inputs.
