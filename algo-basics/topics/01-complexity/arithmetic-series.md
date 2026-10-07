---
id: complexity-arithmetic-series
kind: code
version: 1
level: 1
tags: [complexity, sums]
requires:
  - complexity-count-loop-steps
input: chips
choices:
  c1: ["n * (n + 1) / 2", "n * n / 2", "n * (n - 1) / 2", "(n + 1) / 2 * n"]
compile:
  harness: |
    static_assert(total(1) == closed(1));
    static_assert(total(4) == closed(4));
    static_assert(total(100) == closed(100));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
---

`total(n)` adds 1 + 2 + … + n, the work of a loop whose inner part
grows by one each pass. Complete the closed form.

```cpp
constexpr long total(long n) {
  long s = 0;
  for (long i = 1; i <= n; ++i) s += i;
  return s;
}
constexpr long closed(long n) { return {{c1::n * (n + 1) / 2}}; }
```

---

Pair the first term with the last: 1 + n, 2 + (n − 1), … each pair sums
to n + 1, and there are n/2 pairs. So the sum is n(n + 1)/2 = Θ(n²):
5 050 for n = 100. `(n + 1) / 2 * n` divides first and truncates for
even n (n = 4 gives 8, not 10).
