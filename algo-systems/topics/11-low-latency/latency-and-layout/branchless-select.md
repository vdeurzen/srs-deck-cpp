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

Read it as "start from `b`, and flip exactly the bits where `a`
differs, but only if the mask says so". With `mask == 0` the AND
vanishes and the result is `b`; with `mask == −1` the AND is
`a ^ b` and `b ^ (a ^ b)` is `a`. Three instructions, no branch, no
misprediction, and the same constant cost every time.

Two things to be careful about before reaching for this. First,
**write the branch and check the assembly** — a compiler will very
often emit `cmov` for `cond ? a : b` on its own, and the readable
version is then strictly better. The mask trick earns its place when
the compiler insists on a branch, when you need the mask anyway for
SIMD lanes, or when the same mask selects several values.

Second, **branchless is not always faster**. It always evaluates both
sides, so it loses when one side is expensive or when the branch is
well predicted, and it converts a control dependency into a *data*
dependency, which lengthens the critical path of a dependency chain.
The rule from the foundations Topic applies: unpredictable branch,
both sides cheap → branchless; otherwise leave it.

The related idioms worth recognising: `x & (x - 1)` clears the lowest
set bit, `x & -x` isolates it, `(x ^ y) & -(x < y)` builds a
conditional swap (the compare-exchange of a sorting network), and
`(x >> 31)` broadcasts a sign bit into a mask for `abs`. They all rely
on two's complement, but not on the same signedness: `x & -x` and
`x & (x - 1)` want **unsigned** operands, since negating or
decrementing `INT_MIN` is undefined; `x >> 31` must stay **signed**,
since only a signed right shift is arithmetic and broadcasts the sign
bit (guaranteed since C++20, [expr.shift]) — on an unsigned `x` it
yields 0 or 1 and the `abs` idiom silently breaks. Getting that
backwards is where this style of code quietly goes wrong.
