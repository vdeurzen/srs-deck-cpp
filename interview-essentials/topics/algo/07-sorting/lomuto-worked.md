---
id: sort-lomuto-worked
kind: basic
version: 2
level: 1
tags: [sorting, quicksort, partition, worked-example]
requires:
  - sort-quick-idea
  - sort-std-swap
  - cpp-essentials/expr-increment-value
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  - https://en.cppreference.com/w/cpp/algorithm/partition
---

## Lomuto partition of `3 8 1 6` around the last element, 6. `store` is where the next value smaller than the pivot goes.

```cpp
int store = 0;
for (int i = 0; i < 3; ++i)
  if (a[i] < 6) { std::swap(a[i], a[store]); ++store; }
std::swap(a[store], a[3]);
```

```
i     below 6     action            array     store
0     3 yes       swap a[0], a[0]   3 8 1 6   1
1     8 no        —                 3 8 1 6   1
2     1 yes       swap a[2], a[1]   3 1 8 6   2
end               swap a[2], a[3]   3 1 6 8   2
```

Why does row i = 2 swap the 1 into slot 1 instead of leaving it at slot 2?

---

**Slot 1 holds the 8, the first value ≥ 6; the swap grows the smaller block.**

Everything left of `store` is < 6 and everything from `store` up to `i`
is ≥ 6. Swapping the 1 with the 8 at `store` grows the smaller block by
one and keeps both groups whole.
