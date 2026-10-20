---
id: complexity-cost-trace-doubling
kind: basic
version: 2
level: 1
tags: [foundations, complexity, cost-model]
requires:
  - complexity-cost-trace-single-loop
  - interview-essentials/complexity-log-halvings
elaborate: Name a loop in real code whose variable grows or shrinks by a factor each pass, and say what it costs.
refs:
  - https://en.wikipedia.org/wiki/Logarithm
---

```cpp
int steps = 0;
void grow(long n) {
  for (long i = 1; i < n; i *= 3) ++steps;
}
```

## `grow(1000)` runs `++steps` 7 times. How many times does `grow(1000000)` run it?

---

**13: a thousand times the input adds only six steps.**

`i` takes the powers of 3 below n, 3⁰ up to 3¹² = 531 441. A loop that
multiplies its variable by a constant runs about log n times; the base
only changes the constant factor.
