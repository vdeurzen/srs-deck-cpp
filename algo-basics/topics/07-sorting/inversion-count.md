---
id: sort-inversion-count
kind: basic
version: 2
level: 1
tags: [foundations, sorting, inversions]
requires:
  - complexity-arithmetic-series
elaborate: Where would counting inversions help outside sorting, such as measuring how far apart two rankings are?
refs:
  - https://en.wikipedia.org/wiki/Inversion_(discrete_mathematics)
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

## An **inversion** is a pair of positions i < j whose values are out of order, `a[i] > a[j]`. How many inversions does a reversed array of n distinct values have?

---

**n(n − 1)/2: every pair is inverted, the most any array can have.**

Each earlier value is larger than every later one, so all pairs count:
`[3 2 1]` has 3·2, 3·1 and 2·1, and `[5 4 3 2 1]` has 10. Sorted has 0:
the count measures how far from sorted it is.
