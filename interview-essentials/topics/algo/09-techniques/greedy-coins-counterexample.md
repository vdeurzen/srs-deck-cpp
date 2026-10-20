---
id: technique-greedy-coins-counterexample
kind: trace
version: 2
level: 2
tags: [greedy, tracing, misconception]
requires:
  - technique-greedy-idea
  - cpp-essentials/vector-basics
  - cpp-essentials/iter-range-for-intro
elaborate: Which "obviously take the biggest/cheapest first" rule in your own code has never been checked against a counterexample?
probes:
  1: { used: "3" }
refs:
  - https://doi.org/10.1016/0304-3975(94)90061-2
  - https://en.wikipedia.org/wiki/Change-making_problem
---

Many expect that taking the largest coin that fits, until the amount is
paid, always uses the fewest coins. `greedy` does exactly that (coins
listed largest first). Pay 6 with coins 4, 3 and 1.

```cpp
int greedy(std::vector<int> coins, int amount) {
  int used = 0;
  for (int c : coins)
    while (amount >= c) { amount -= c; ++used; }
  return used;
}

int main() {
  std::vector<int> coins{4, 3, 1};
  int used = greedy(coins, 6);   // @1
}
```

---

Greedy pays 6 as 4 + 1 + 1 = **3 coins**, but 3 + 3 is **2**. Taking
the 4 felt safe and ruled out the better answer: the rule is optimal
for some coin systems and silently wrong for others.

(Values from running it under GCC 16.2.)
