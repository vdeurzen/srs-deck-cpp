---
id: complexity-asym-big-omega-witness
kind: code
version: 1
level: 1
tags: [foundations, complexity, big-omega]
requires:
  - interview-essentials/complexity-asym-big-omega
input: chips
choices:
  c1: ["20", "10", "11", "40"]
compile:
  harness: |
    static_assert(threshold() == n0);
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

f(n) = n² − 10n is Ω(n²) with c = 1/2. `threshold()` finds the smallest
start from which f(n) ≥ n²/2 holds for every later n. Complete n₀ to
match it.

```cpp
constexpr long f(long n) { return n * n - 10 * n; }

constexpr long threshold() {        // one past the last n where f(n) < n²/2
  long start = 0;
  for (long n = 0; n < 100'000; ++n)
    if (2 * f(n) < n * n) start = n + 1;
  return start;
}
constexpr long n0 = {{c1::20}};
```

---

n² − 10n ≥ n²/2 means n²/2 ≥ 10n, i.e. n ≥ 20. Below n = 10 the
function is not even positive; the definition only speaks about large n,
which is what n₀ is for. `10` and `11` are where f turns positive, not
where it reaches half of n². `40` is a valid start but not the smallest.
Any c < 1 works from some n₀, because the leading coefficient is 1.
