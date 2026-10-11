---
id: linear-array-front-insert
kind: basic
version: 1
level: 1
tags: [foundations, arrays, complexity]
requires:
  - linear-address-formula
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1 (arrays)
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

## An array holds n elements in `a[0..n)` and has spare room at the end. A new element must become `a[0]`. How many existing elements move?

```text
before: [ 3 | 8 | 5 | 1 | _ ]      insert 7 at the front
```

---

**All n: each shifts one slot to the right.**

Elements must stay back to back with no gaps, or `base + i · size` would
find the wrong element. So making room at the front costs O(n); at the
end (with room) it moves nothing.
