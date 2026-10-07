---
id: technique-greedy-coins-counterexample
kind: trace
version: 1
level: 2
tags: [greedy, tracing, misconception]
requires:
  - technique-greedy-choice
elaborate: Which "obviously take the biggest/cheapest first" rule in your own code has never been checked against a counterexample?
probes:
  1: { b: "6" }
  2: { c: "3" }
refs:
  - https://doi.org/10.1016/0304-3975(94)90061-2
  - https://en.wikipedia.org/wiki/Change-making_problem
---

`greedy` takes the largest coin that fits until the amount is paid
(coins listed largest first). Each probe reads its variable.

```cpp
int greedy(const int* coins, int k, int amount) {
  int used = 0;
  for (int i = 0; i < k; ++i)
    while (amount >= coins[i]) { amount -= coins[i]; ++used; }
  return used;
}

int main() {
  int us[] = {25, 10, 5, 1};
  int odd[] = {4, 3, 1};
  int b = greedy(us, 4, 63);   // @1
  int c = greedy(odd, 3, 6);   // @2
}
```

---

US coins: 25 + 25 + 10 + 1 + 1 + 1, optimal. With
{4, 3, 1}, greedy pays 6 as 4 + 1 + 1 = **3 coins**, but 3 + 3 is
**2**. Taking the 4 felt safe and ruled out the better answer. Greedy
works for some coin systems ("canonical" ones) and silently fails for
others.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
