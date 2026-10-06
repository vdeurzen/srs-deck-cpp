---
id: foundations-dp-memo-calls
kind: trace
version: 1
level: 2
tags: [dynamic-programming, recursion, tracing]
requires:
  - foundations-dp-overlapping-subproblems
probes:
  1: { calls: "15" }
  2: { calls: "25" }
  3: { calls: "9" }
refs:
  - https://en.wikipedia.org/wiki/Memoization
---

Each probe reads `calls` after the statement on its line.

```cpp
int calls = 0;
long fib(int n) { ++calls; return n < 2 ? n : fib(n - 1) + fib(n - 2); }

long memo[32]; bool seen[32];
long fib_memo(int n) {
  ++calls;
  if (n < 2) return n;
  if (seen[n]) return memo[n];
  seen[n] = true;
  return memo[n] = fib_memo(n - 1) + fib_memo(n - 2);
}

int main() {
  fib(5);                  // @1
  calls = 0; fib(6);       // @2
  calls = 0; fib_memo(5);  // @3
}
```

---

Naively, `calls(n) = calls(n−1) + calls(n−2) + 1`: 1, 1, 3, 5, 9, 15, 25 —
it grows like fib itself, about ×1.6 per step, so `fib(30)` makes over
2.6 million calls. With the memo, each `n` from 2 to 5 recurses once and
every other call returns from the table: `2n − 1 = 9` calls, linear.

Same recurrence, same answer; the only change is that a repeated
subproblem is looked up instead of recomputed. That is all dynamic
programming is.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
