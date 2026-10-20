---
id: complexity-asym-big-o-witness
kind: code
version: 1
level: 1
tags: [foundations, complexity, big-o]
requires:
  - interview-essentials/complexity-asym-big-o-definition
input: chips
choices:
  c1: ["4", "2", "3", "12"]
compile:
  harness: |
    static_assert(holds(c));       // f stays under c·n from n0 on
    static_assert(!holds(c - 1));  // and no smaller integer c does
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

f(n) = 2n + 10 is O(n). With the threshold fixed at n₀ = 5, complete the
**smallest** integer c for which f(n) ≤ c·n holds for every n ≥ n₀.

```cpp
constexpr long f(long n) { return 2 * n + 10; }
constexpr long n0 = 5;
constexpr long c = {{c1::4}};

constexpr bool holds(long cc) {   // f(n) <= cc·n for every n >= n0 checked
  for (long n = n0; n < 100'000; ++n)
    if (f(n) > cc * n) return false;
  return true;
}
```

---

2n + 10 ≤ c·n means c ≥ 2 + 10/n, and the demand is largest at the
first n, n₀ = 5: c ≥ 4. The two constants trade off: c = 3 works from
n₀ = 10, and any c above the slope 2 works from some n₀. `2` is the
slope alone and fails for every n; `12` works but is not the smallest.
The definition asks only for *some* pair; the harness asks for the
smallest to pin one answer.
