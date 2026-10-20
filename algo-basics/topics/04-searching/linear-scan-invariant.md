---
id: search-linear-scan-invariant
kind: cloze
version: 1
level: 1
tags: [foundations, linear-search, invariants]
requires:
  - search-linear-scan-code
  - interview-essentials/technique-loop-invariant-sum
refs:
  - https://en.wikipedia.org/wiki/Loop_invariant
---

```cpp
for (int i = 0; i < n; ++i)
  if (a[i] == key) return i;
return -1;
```

At the top of each iteration, `key` does not occur in
{{c1::`a[0..i)`, the elements before `i`::which slice has been ruled out?}}.
When the loop ends without returning, `i` equals {{c2::`n`::its exit value}},
which is what makes -1 the right answer.

---

Example: `a = {6, 2, 8}`, `key = 8`. At `i = 2` the scan has ruled out
6 and 2, exactly `a[0..2)`, and then finds 8. The statement is what
licenses the final `return -1`: it is true at every step, and at the end
it covers everything.
