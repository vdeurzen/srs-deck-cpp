---
id: complexity-cost-arithmetic-sum
kind: code
version: 1
level: 1
tags: [foundations, complexity, sums]
input: chips
choices:
  c1: ["(b - a + 1) * (a + b) / 2", "(b - a) * (a + b) / 2", "(b - a + 1) * b / 2", "b * (b + 1) / 2"]
compile:
  harness: |
    static_assert(sum_range(1, 100) == closed(1, 100));
    static_assert(sum_range(5, 9) == closed(5, 9));
    static_assert(sum_range(3, 3) == closed(3, 3));
    static_assert(sum_range(0, 9) == closed(0, 9));
    int main() {}
requires:
  - cpp-essentials/constexpr-fn-static-assert
  - complexity-arithmetic-sum-intro
elaborate: "Where else does 'number of terms × average term' give a loop's cost at a glance, for instance an inner loop that starts at i?"
refs:
  - https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
---

`sum_range(a, b)` adds the integers a, a + 1, …, b: the cost of a loop
whose inner part grows by one each pass. Complete the closed form that
needs no loop.

```cpp
constexpr long sum_range(long a, long b) {
  long s = 0;
  for (long i = a; i <= b; ++i) s += i;
  return s;
}
constexpr long closed(long a, long b) { return {{c1::(b - a + 1) * (a + b) / 2}}; }
```

---

**Number of terms × average term.** Pair the first with the last, the
second with the second-last: every pair sums to a + b, and there are
(b − a + 1)/2 pairs. So 1 + … + 100 = 100 · 101 / 2 = 5 050 and
5 + … + 9 = 5 · 14 / 2 = 35. Dropping the "+ 1" miscounts the terms;
`b(b + 1)/2` is only the special case a = 1.
