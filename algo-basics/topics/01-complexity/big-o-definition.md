---
id: complexity-big-o-definition
kind: code
version: 1
level: 2
tags: [complexity, big-o]
requires:
  - complexity-drop-terms
input: chips
choices:
  c1: ["101", "100", "1", "7"]
compile:
  harness: |
    static_assert(bounded_from(n0));       // holds from n0 on
    static_assert(!bounded_from(n0 - 1));  // and n0 is the smallest such start
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

f(n) is O(g(n)) when some constant c and starting point n₀ give
f(n) ≤ c·g(n) for every n ≥ n₀. With f(n) = 3n² + 100n + 7 and c = 4,
complete the **smallest** n₀ that works.

```cpp
constexpr long f(long n) { return 3 * n * n + 100 * n + 7; }
constexpr long n0 = {{c1::101}};

constexpr bool bounded_from(long start) {  // f(n) <= 4·n² for every n checked
  for (long n = start; n < 100'000; ++n)
    if (f(n) > 4 * n * n) return false;
  return true;
}
```

---

4n² ≥ 3n² + 100n + 7 means n² ≥ 100n + 7, so n > 100.07: n₀ = 101
(at n = 100, f is 40 007 against 40 000). Any c above 3 works with a
large enough n₀; that freedom is why big-O can ignore both the lower
terms and the leading 3. The definition never asks for the *smallest*
n₀: the harness does, to pin one answer.
