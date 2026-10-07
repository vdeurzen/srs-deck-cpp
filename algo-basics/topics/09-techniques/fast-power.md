---
id: technique-fast-power
kind: code
version: 1
level: 2
tags: [divide-and-conquer, recursion]
requires:
  - technique-divide-and-conquer
  - complexity-log-halvings
input: chips
choices:
  c1:
    - "power(x, n / 2, calls)"
    - "power(x, n - 1, calls)"
    - "power(x * x, n / 2, calls)"
    - "power(x, n / 2 + 1, calls)"
compile:
  harness: |
    constexpr long run(long x, int n) { int c = 0; return power(x, n, c); }
    constexpr int calls_for(int n) { int c = 0; power(1, n, c); return c; }
    static_assert(run(2, 10) == 1024);
    static_assert(run(3, 13) == 1'594'323);
    static_assert(run(5, 0) == 1);
    static_assert(calls_for(1000) == 11);  // 1000, 500, ..., 1, 0
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Exponentiation_by_squaring
---

`power` computes xⁿ by solving a half-sized problem once and squaring the
result; `calls` counts invocations. Complete the recursive step.

```cpp
constexpr long power(long x, int n, int& calls) {
  ++calls;
  if (n == 0) return 1;
  long half = {{c1::power(x, n / 2, calls)}};
  return n % 2 ? half * half * x : half * half;
}
```

---

x¹³ = (x⁶)²·x and x⁶ = (x³)²: n halves each call, so
T(n) = T(n/2) + O(1) = O(log n), 11 calls for n = 1000 against 1000
multiplications for the loop. Reusing `half` is essential: calling
`power` twice would be T(n) = 2T(n/2) + O(1), back to O(n).
