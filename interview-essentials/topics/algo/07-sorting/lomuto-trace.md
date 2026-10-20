---
id: sort-lomuto-trace
kind: trace
version: 4
level: 2
tags: [tracing, sorting, quicksort, partition]
probes:
  1: { store: "1", "a[1]": "8" }
  2: { "a[3]": "8" }
requires:
  - sort-lomuto-worked
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  - https://en.cppreference.com/w/cpp/algorithm/partition
elaborate: Say in one sentence, as to an interviewer, what is true of the array after this one call, and what is still unknown.
---

Lomuto partition, pivot = the last element. Probe 1 is read once the
loop has finished, probe 2 after the final swap.

```cpp
int a[] = {8, 3, 9, 5};               // pivot = a[3] = 5
int store = 0;
for (int i = 0; i < 3; ++i) {
  if (a[i] < 5) { std::swap(a[i], a[store]); ++store; }
}                                      // @1
std::swap(a[store], a[3]);             // @2
```

---

8 is skipped, so `store` stays 0; 3 is smaller, swaps with the 8 at
slot 0 and `store` becomes 1; 9 is skipped. After the loop: `3 8 9 5`,
`store` = 1. The final swap drops the pivot into slot 1, between the
groups, and sends the 8 to the end: `3 5 9 8`.

(Values from running it under GCC 16.2.)
