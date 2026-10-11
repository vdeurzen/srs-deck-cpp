---
id: technique-postcondition-code
kind: code
version: 1
level: 2
tags: [foundations, contracts]
requires:
  - technique-precondition-blame
input: chips
choices:
  c1:
    - "r * r <= n && n < (r + 1) * (r + 1)"
    - "r * r <= n && n <= (r + 1) * (r + 1)"
    - "r * r < n && n < (r + 1) * (r + 1)"
    - "r * r <= n"
    - "r * r == n"
compile:
  harness: |
    static_assert(post(40, isqrt(40)));
    static_assert(post(49, isqrt(49)));
    static_assert(post(0, isqrt(0)));
    static_assert(!post(40, 5));   // too small
    static_assert(!post(40, 7));   // too big
    static_assert(!post(49, 6));   // (r + 1)² == n
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/363235.363259
  - https://en.wikipedia.org/wiki/Integer_square_root
---

`isqrt(n)` returns ⌊√n⌋ for `n ≥ 0`. `post(n, r)` states what the
caller may rely on: it is true when `r` is a correct result for `n`.
Complete it.

```cpp
constexpr long long isqrt(long long n) {
  long long r = 0;
  while ((r + 1) * (r + 1) <= n) ++r;
  return r;
}
constexpr bool post(long long n, long long r) { return {{c1::r * r <= n && n < (r + 1) * (r + 1)}}; }
```

---

**`r` is small enough and `r + 1` is too big.** A half-strength
postcondition is satisfied by wrong code: `r * r <= n` alone accepts an
`isqrt` that always returns 0. `r * r == n` rejects the right answer 6
for 40. The edges matter too: `n <= (r + 1)²` accepts 6 for 49, and
`r * r < n` rejects 7 for 49.
