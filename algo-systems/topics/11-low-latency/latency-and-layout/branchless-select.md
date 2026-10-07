---
id: ll-branchless-select
kind: code
version: 1
level: 4
tags: [low-latency, branchless, bit-tricks]
input: chips
choices:
  c1:
    - "b ^ ((a ^ b) & mask)"
    - "a ^ ((a ^ b) & mask)"
    - "(a & mask) | b"
    - "b ^ ((a ^ b) | mask)"
compile:
  harness: |
    static_assert(select(true, 3, 7) == 3);
    static_assert(select(false, 3, 7) == 7);
    static_assert(select(true, -5, 2) == -5);
    static_assert(select(false, 0, -1) == -1);
    static_assert(select(true, 0, 0) == 0);
    int main() {}
requires:
  - foundations-branch-misprediction
refs:
  - https://en.algorithmica.org/hpc/pipelining/branchless/
  - https://graphics.stanford.edu/~seander/bithacks.html
---

`mask` is all-ones when `cond` holds and all-zeros otherwise. Complete
the branchless equivalent of `cond ? a : b`.

```cpp
constexpr int select(bool cond, int a, int b) {
  const int mask = -static_cast<int>(cond);   // true -> -1, false -> 0
  return {{c1::b ^ ((a ^ b) & mask)}};
}
```

---

**Start from `b` and flip exactly the bits where `a` differs, if the
mask says so.** `mask == 0` leaves `b`; `mask == -1` gives `b ^ (a ^ b)`,
which is `a`. Three instructions, no branch, constant cost.

Write the plain `cond ? a : b` first and read the assembly: compilers
often emit `cmov` themselves. Branchless always evaluates both sides and
turns a control dependency into a data dependency, so it pays only for an
unpredictable branch with cheap arms. Signedness matters: `-static_cast<int>`
and `x >> 31` mask tricks want **signed** values (only a signed right
shift broadcasts the sign bit, [expr.shift]), while `x & -x` and
`x & (x - 1)` want **unsigned** ones.
