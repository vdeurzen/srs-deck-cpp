---
id: sort-hoare-worked
kind: basic
version: 1
level: 2
tags: [sorting, quicksort, partition, worked-example]
requires:
  - interview-essentials/sort-quick-idea
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
---

## Hoare partition of `4 6 1 2`, pivot = the first element, 4. `i` scans right and stops on a value ≥ 4; `j` scans left and stops on a value ≤ 4. They swap, until they cross and `j` is returned.

```
i stops on    j stops on    action          array
4 (slot 0)    2 (slot 3)    swap            2 6 1 4
6 (slot 1)    1 (slot 2)    swap            2 1 6 4
6 (slot 2)    1 (slot 1)    crossed: j = 1  2 1 | 6 4
```

The first row swapped the pivot 4 itself to the far end. Why is that allowed?

---

**Hoare promises only `a[0..j]` ≤ 4 ≤ `a[j+1..]`, not a slot for the pivot.**

The pivot is one more value equal to 4, so either part may hold it.
That is why quicksort then recurses on `[lo, j]` and `[j + 1, hi]`:
slot j is not final.
