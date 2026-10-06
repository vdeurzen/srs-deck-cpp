---
id: foundations-growth-factor
kind: basic
version: 1
level: 3
requires:
  - foundations-amortised-vs-average
tags: [complexity, amortised, sequences, allocators]
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://github.com/facebook/folly/blob/main/folly/docs/FBVector.md
---

## Why must a dynamic array grow *geometrically*, and what is the argument for a factor below 2?

---

**Geometric growth is what buys amortised O(1).** Growing by a constant
`k` elements means reallocation every `k` pushes, each copying the whole
array: `n/k` reallocations copying an average of `n/2` elements is
Θ(n²/k) total, so Θ(n/k) *per push* — linear, not constant. Growing by a
factor `g > 1` makes the copies a geometric series,
`1 + g + g² + … + n < n·g/(g−1)`, which is Θ(n) total and therefore O(1)
each.

**The factor trades memory against copies.** With `g = 2`, each push
costs about 2 element-moves amortised and up to 100 % of the capacity can
be slack right after a grow. With `g = 1.5` the slack is smaller and the
copies more frequent (about 3 moves amortised).

**The allocator argument for `g < 2`**: with doubling, the sum of all
previously freed blocks, `1 + 2 + 4 + … + 2^(k−1) = 2^k − 1`, is always
just *less* than the next request `2^k`, so a coalescing allocator can
never satisfy the next growth by reusing the space the vector itself
freed — the array walks forward through the address space. Any factor
below the golden ratio φ ≈ 1.618 lets earlier blocks eventually coalesce
into a later request. This is why `folly::fbvector` uses 1.5; libstdc++
and libc++ still double.

In practice the bigger win is not the factor but avoiding the question:
`reserve(n)` when `n` is known removes every reallocation, every move, and
every reference invalidation from the path.
