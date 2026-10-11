---
id: complexity-asym-log-factorial
kind: code
version: 1
level: 2
tags: [foundations, complexity, logarithms]
requires:
  - complexity-asym-log-rules
  - complexity-asym-theta-sandwich
input: chips
choices:
  c1: ["pw(n / 2, n / 2)", "pw(2, n)", "pw(n / 2, n)", "pw(n, 2)"]
compile:
  harness: |
    constexpr bool sandwiched() {
      for (int n = 2; n <= 40; ++n)
        if (fact(n) < lower(n) || fact(n) > upper(n)) return false;
      return true;
    }
    static_assert(sandwiched());
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Stirling%27s_approximation
  - https://en.wikipedia.org/wiki/Factorial#Rate_of_growth
---

Squeeze n! between two powers, then take log₂ of both: that is the whole
proof that log n! = Θ(n log n). The upper power is given; complete the
lower one so it holds for every n ≥ 2 and still has n log n in its log.

```cpp
constexpr double pw(double b, int e) { double r = 1; while (e-- > 0) r *= b; return r; }
constexpr double fact(int n) { return n < 2 ? 1 : n * fact(n - 1); }
constexpr double upper(int n) { return pw(n, n); }   // n! = 1·2·…·n <= n·n·…·n
constexpr double lower(int n) { return {{c1::pw(n / 2, n / 2)}}; }
```

---

The top half of the factors, n/2 + 1 … n, are each at least n/2 and
there are at least n/2 of them: n! ≥ (n/2)^(n/2). Logs:
(n/2)·log₂(n/2) ≤ log₂ n! ≤ n·log₂ n, both sides Θ(n log n). `pw(2, n)`
is tempting: 2ⁿ ≤ n! does hold from n = 4, but fails at 2 and 3 and its
log is only n, too weak. `pw(n / 2, n)` overshoots (3⁶ = 729 > 720).
