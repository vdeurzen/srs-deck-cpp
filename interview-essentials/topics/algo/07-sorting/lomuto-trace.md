---
id: sort-lomuto-trace
kind: trace
version: 3
level: 2
tags: [tracing, sorting, quicksort, partition]
probes:
  1: { store: "2", "a[1]": "2" }
  2: { p: "2", "a[4]": "7" }
requires:
  - sort-lomuto-worked
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  - https://en.cppreference.com/w/cpp/algorithm/partition
elaborate: Say in one sentence, as to an interviewer, what is true of the array after this one call, and what is still unknown.
---

Lomuto partition, pivot = the last element. `p` is where the pivot
ends up.

```cpp
int a[] = {4, 7, 2, 9, 5};            // pivot = a[4] = 5
int store = 0;
for (int i = 0; i < 4; ++i)
  if (a[i] < 5) { std::swap(a[i], a[store]); ++store; }
                                       // @1
std::swap(a[store], a[4]);
int p = store;                         // @2
```

---

4 swaps with itself and `store` becomes 1; 7 and 9 are skipped; 2 swaps
with the 7 at slot 1, so the array is `4 2 7 9 5` and `store` is 2. The
final swap drops the pivot into slot 2, between the groups, and sends
the 7 to the end: `4 2 5 9 7`.

(Values from running it under GCC 16.2.)
