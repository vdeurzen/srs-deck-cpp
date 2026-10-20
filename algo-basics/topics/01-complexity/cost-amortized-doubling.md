---
id: complexity-cost-amortized-doubling
kind: code
version: 1
level: 2
tags: [foundations, complexity, amortised]
requires:
  - complexity-cost-amortized
  - interview-essentials/complexity-cost-geometric-sum
input: chips
choices:
  c1: ["2 * n", "n", "3 * n", "n * n / 2"]
compile:
  harness: |
    static_assert(copies(1'000) <= bound(1'000));
    static_assert(copies(1'025) <= bound(1'025));
    static_assert(copies(100'000) <= bound(100'000));
    static_assert(bound(1'025) < 3 * 1'025);  // and no looser than needed
    int main() {}
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

`copies(n)` counts the elements moved by `n` pushes into a growable
array that doubles its capacity when full. Complete `bound` with the
smallest multiple of `n` that `copies(n)` never exceeds.

```cpp
constexpr long copies(long n) {
  long cap = 1, size = 0, moved = 0;
  for (long k = 0; k < n; ++k) {
    if (size == cap) { moved += size; cap *= 2; }
    ++size;
  }
  return moved;
}
constexpr long bound(long n) { return {{c1::2 * n}}; }
```

---

Copies happen at sizes 1, 2, 4, …, up to the last power of two below n,
and a doubling series is less than twice its last term, so
copies(n) < 2n: 1 023 for n = 1 000, 2 047 for n = 1 025. Spread over
the n pushes that is under 2 per push: **amortised constant**. `n` is
too small (1 023 > 1 000); `3n` and `n²/2` are true but loose.
