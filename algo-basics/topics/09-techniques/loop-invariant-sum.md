---
id: technique-loop-invariant-sum
kind: cloze
version: 1
level: 1
tags: [foundations, invariants]
refs:
  - https://en.wikipedia.org/wiki/Loop_invariant
  - https://dl.acm.org/doi/10.1145/363235.363259
---

```cpp
int s = 0;
for (int i = 0; i < n; ++i)
  s += a[i];
// claim at the top of every iteration: s == a[0] + ... + a[i-1]
```

Before the first iteration `i == 0`, so the claim says `s` is
{{c1::0, the sum of no elements::the value of an empty sum}}. If the
claim holds at the top of an iteration, then right after `s += a[i]`
(before `++i`), `s` equals `a[0] + ... +` {{c2::`a[i]`::the old `i`}};
the `++i` turns that back into the claim. At exit `i == n`, so `s` is the sum of the
whole array.

---

Those three checks are **initialisation, maintenance, termination**, and
a claim that passes all three is a **loop invariant**. Start `s` at 1 and
maintenance still passes, but initialisation fails, and the final
answer is off by one.
