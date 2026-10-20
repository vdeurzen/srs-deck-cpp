---
id: technique-dp-memo-calls
kind: basic
version: 2
level: 2
tags: [dynamic-programming, recursion]
requires:
  - interview-essentials/technique-dp-overlapping-subproblems
elaborate: Plain fib(30) makes over 2.6 million calls. Say in one sentence, as to an interviewer, how many this memo makes and why.
refs:
  - https://en.wikipedia.org/wiki/Memoization
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

## Plain recursive `fib(5)` makes 15 calls. Counting the first call, how many calls does this memoised `fib_memo(5)` make?

```cpp
long memo[32]; bool seen[32];
long fib_memo(int n) {
  if (n < 2) return n;
  if (seen[n]) return memo[n];
  memo[n] = fib_memo(n - 1) + fib_memo(n - 2);
  seen[n] = true;
  return memo[n];
}
```

---

**9, that is 2n − 1: linear, not exponential.**

Calls for 5, 4, 3 and 2 each recurse, making two calls apiece:
1 + 2·4 = 9. Every `fib_memo(n − 2)` returns at once, because the
`fib_memo(n − 1)` just before it already filled that entry.
