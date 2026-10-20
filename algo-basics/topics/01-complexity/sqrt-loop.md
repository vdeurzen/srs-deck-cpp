---
id: complexity-sqrt-loop
kind: basic
version: 2
level: 2
tags: [complexity, primes]
requires:
  - interview-essentials/complexity-count-loop-steps
elaborate: Where else does pairing each candidate d with n / d let a search stop at √n?
refs:
  - https://en.wikipedia.org/wiki/Trial_division
---

```cpp
bool is_prime(int n) {
  for (int d = 2; d * d <= n; ++d)
    if (n % d == 0) return false;
  return n >= 2;
}
```

## For the prime 10 007 the loop tries 99 divisors. How many does it try for the prime 1 000 003?

---

**999: it stops at √n, so 100× the input costs only 10× the tries.**

d runs from 2 up to √n rounded down: 100, then 1 000. That is O(√n).
A composite exits early (91 = 7 · 13 stops at d = 7), so √n is the worst
case.
