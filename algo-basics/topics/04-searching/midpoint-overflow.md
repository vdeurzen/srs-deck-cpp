---
id: search-midpoint-overflow
kind: code
version: 1
level: 2
tags: [binary-search, overflow]
requires:
  - search-binary-search-trace
input: chips
choices:
  c1: ["lo + (hi - lo) / 2", "(lo + hi) / 2", "(lo + hi) >> 1", "hi - lo / 2"]
compile:
  harness: |
    static_assert(midpoint(0, 8) == 4);
    static_assert(midpoint(5, 6) == 5);
    static_assert(midpoint(2'000'000'000, 2'100'000'000) == 2'050'000'000);
    int main() {}
refs:
  - https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/
  - https://en.cppreference.com/w/cpp/numeric/midpoint
---

Indices are `int` and an array may hold more than a billion elements.
Complete the midpoint of `[lo, hi)` so it never overflows.

```cpp
constexpr int midpoint(int lo, int hi) {   // 0 <= lo < hi
  return {{c1::lo + (hi - lo) / 2}};
}
```

---

**Add half the distance to `lo`; never add `lo` and `hi`.** With
`lo = 2·10⁹` and `hi = 2.1·10⁹`, `lo + hi` exceeds `INT_MAX`
(≈ 2.147·10⁹): signed overflow is undefined behaviour, which a constant
expression rejects.

`hi - lo` always fits because both are non-negative. This bug sat in
Java's `Arrays.binarySearch` for nine years. C++20 has `std::midpoint`.
