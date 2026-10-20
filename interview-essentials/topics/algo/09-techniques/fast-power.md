---
id: technique-fast-power
kind: code
version: 1
level: 2
tags: [divide-and-conquer, recursion]
requires:
  - complexity-log-halvings
  - technique-call-stack-worked
  - cpp-essentials/constexpr-fn-static-assert
elaborate: Say aloud, as to an interviewer, why calling `power` twice for the two halves throws the speed-up away.
input: chips
choices:
  c1:
    - "power(x, n / 2)"
    - "power(x, n - 1)"
    - "power(x * x, n / 2)"
    - "power(x, n / 2 + 1)"
compile:
  harness: |
    static_assert(power(2, 10) == 1024);
    static_assert(power(3, 13) == 1594323);
    static_assert(power(5, 0) == 1);
    static_assert(power(2, 1) == 2);
    static_assert(power(1, 100000) == 1);  // depth ~17: only halving fits the constexpr limit
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Exponentiation_by_squaring
---

`power` computes xⁿ (`n % 2` is the remainder of n divided by 2).
Complete the recursive step.

```cpp
constexpr long power(long x, int n) {
  if (n == 0) return 1;
  long half = {{c1::power(x, n / 2)}};
  if (n % 2 == 1) return half * half * x;
  return half * half;
}
```

---

x¹³ = (x⁶)²·x and x⁶ = (x³)²: n halves each call, so the calls number
about log₂ n, 11 for n = 1000 against 1000 multiplications for the
loop. Reusing `half` is essential: calling `power` twice doubles the
calls at every level, back to about n.
