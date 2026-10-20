---
id: linear-array-insert-worked
kind: basic
version: 1
level: 1
tags: [arrays, worked-example]
requires:
  - linear-array-index-contiguity
refs:
  - https://en.cppreference.com/w/cpp/container/vector/insert
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §2.1 (insertion sort)
---

## Inserting 7 into the sorted `{3, 6, 9}`, held in an array with spare room:

```cpp
int i = 3;                         // elements in use
while (i > 0 && a[i - 1] > 7) { a[i] = a[i - 1]; --i; }
a[i] = 7;
```

| i | `a[i - 1] > 7` | step | `a` after |
|---|---|---|---|
| 3 | 9 > 7: yes | `a[3] = 9`, then i = 2 | 3 6 9 9 |
| 2 | 6 > 7: no | leave the loop | 3 6 9 9 |
| 2 | — | `a[2] = 7` | 3 6 7 9 |

Why may the last row overwrite the 9 in `a[2]`?

---

**The first row already copied that 9 into `a[3]`.**

Each shift copies an element one slot right before its old slot is
reused, so nothing is lost. The loop stops at the first element not
larger than 7; that one stays put, and the free slot just after it
takes 7.
