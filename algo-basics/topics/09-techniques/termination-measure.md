---
id: technique-termination-measure
kind: basic
version: 1
level: 1
tags: [foundations, termination]
refs:
  - https://en.wikipedia.org/wiki/Euclidean_algorithm
  - https://en.wikipedia.org/wiki/Loop_variant
---

```cpp
int gcd(int a, int b) {        // a, b >= 0
  while (b != 0) { int t = a % b; a = b; b = t; }
  return a;
}
```

## Neither variable is a counter. Which quantity shows that this loop must stop?

---

**`b`: it is a non-negative integer and falls every iteration, since `a % b < b`.**

A non-negative integer cannot fall forever, so the loop ends. Finding
such a **decreasing measure** is how you show any loop or recursion
terminates: `n − i` for a counting loop, `hi − lo` for a binary search.
