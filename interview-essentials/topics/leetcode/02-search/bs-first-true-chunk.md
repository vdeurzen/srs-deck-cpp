---
id: bs-first-true-chunk
kind: chunk
version: 1
level: 3
tags: [binary-search, search-on-answer, lc-875]
expose_ms: 12000
compile:
  harness: |
    #include <array>
    #include <climits>
    template <std::size_t N>
    constexpr int min_speed(std::array<int, N> piles, long h) {    // LC 875
      auto ok = [&](int v) {
        long hours = 0;
        for (int p : piles) hours += (p + v - 1) / v;
        return hours <= h;
      };
      return first_true(1, 1'000'000'000, ok);
    }
    static_assert(min_speed(std::array{3, 6, 7, 11}, 8) == 4);
    static_assert(min_speed(std::array{30, 11, 23, 4, 20}, 5) == 30);
    static_assert(min_speed(std::array{30, 11, 23, 4, 20}, 6) == 23);
    static_assert(first_true(0, 10, [](int x) { return x >= 7; }) == 7);
    static_assert(first_true(0, 10, [](int) { return false; }) == 10);  // none: hi
    static_assert(first_true(3, 3, [](int) { return true; }) == 3);     // empty range
    static_assert(first_true(0, INT_MAX, [](int x) { return x >= 2'000'000'000; })
                  == 2'000'000'000);                                     // no overflow
    int main() {}
requires:
  - search-first-true-predicate
  - cpp-essentials/lambda-syntax-intro
  - cpp-essentials/tmpl-auto-param-cloze
  - search-midpoint-overflow
refs:
  - https://leetcode.com/problems/koko-eating-bananas/
  - https://leetcode.com/problems/split-array-largest-sum/
  - https://cp-algorithms.com/num_methods/binary_search.html
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
elaborate: Split Array Largest Sum (LC 410) splits `nums` into `k` non-empty contiguous parts, minimising the largest part's sum. What is `ok(x)`, and what are `lo` and `hi`?
---

```cpp
constexpr int first_true(int lo, int hi, auto ok) {
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (ok(mid)) hi = mid; else lo = mid + 1;
  }
  return lo;
}
```

---

**Binary search on the answer: the smallest `x` in `[lo, hi]` with
`ok(x)`.** Preconditions: `ok` reads `false … false true … true`, and
`hi` is a value known to satisfy `ok`, or a one-past sentinel; `ok(hi)`
is never called. For Koko Eating Bananas (LC 875: the minimum integer
eating speed that finishes all `piles` within `h` hours; each hour she
eats up to `v` bananas from one pile, so a pile of `p` takes ⌈p / v⌉
hours), `ok(v)` is "the ⌈p / v⌉ sum to at most `h`", with `lo = 1` and `hi` = the largest pile.

A true `mid` may be the answer, so `hi` keeps it; a false one is ruled
out, so `lo` passes it. `lo + (hi − lo) / 2` cannot overflow;
`(lo + hi) / 2` does near `INT_MAX`.
