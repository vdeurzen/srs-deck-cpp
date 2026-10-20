---
id: sort-radix-worked
kind: basic
version: 1
level: 2
tags: [sorting, radix-sort, stability, worked-example]
requires:
  - interview-essentials/sort-stable-meaning
refs:
  - https://en.wikipedia.org/wiki/Radix_sort
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

## LSD radix sort on `21 12 11`: one pass per decimal digit, ones digit first. A pass groups the values by that digit, 0 to 9, keeping each group in the order its values arrive.

```
pass         groups                  result
ones digit   1: 21 11  ·  2: 12      21 11 12
tens digit   1: 11 12  ·  2: 21      11 12 21
```

Why does the tens pass put 11 before 12, though both have tens digit 1?

---

**The pass is stable, and the ones pass had already put 11 before 12.**

A tie on the current digit keeps the order of the previous pass, which
was sorted on the lower digits. So after the last pass the values are
sorted on every digit. Cost: d passes of O(n + 10).
