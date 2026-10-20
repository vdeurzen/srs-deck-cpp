---
id: complexity-cost-trace-harmonic
kind: basic
version: 2
level: 2
tags: [foundations, complexity, cost-model]
requires:
  - complexity-cost-trace-stride
  - complexity-cost-harmonic-number
elaborate: Where does a sum n/1 + n/2 + … + n/n appear in real code, as in a prime sieve, and why is it cheaper than its nesting suggests?
refs:
  - https://en.wikipedia.org/wiki/Harmonic_number
  - https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Algorithmic_complexity
---

```cpp
int total(int n) {
  int s = 0;
  for (int i = 1; i <= n; ++i)
    for (int j = 0; j < n; j += i) ++s;
  return s;
}
```

## The inner loop's stride is the outer index. How does `total(n)` grow with n?

---

**Like n log n: pass i costs about n/i, summing to n · H(n).**

H(n) = 1 + 1/2 + … + 1/n grows like ln n, so the total is about n ln n
(`total(16)` is 61), far below the n² the nesting suggests: most passes
take a handful of steps.
