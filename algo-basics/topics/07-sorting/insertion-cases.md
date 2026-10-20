---
id: sort-insertion-cases
kind: basic
version: 2
level: 2
tags: [sorting, insertion-sort, complexity]
requires:
  - sort-insertion-trace
  - complexity-best-worst-linear-search
  - cpp-essentials/types-size-t
elaborate: Where in a larger sort would you deliberately run insertion sort, given this best case?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Insertion_sort
---

## This insertion sort runs on the already sorted `a = {1, 2, 3, 4, 5}`. How many times does it evaluate `a[j - 1] > key`?

```cpp
for (std::size_t i = 1; i < 5; ++i) {
  const int key = a[i];
  std::size_t j = i;
  while (j > 0 && a[j - 1] > key) { a[j] = a[j - 1]; --j; }
  a[j] = key;
}
```

---

**4, that is n − 1: each key fails its first comparison, so Θ(n).**

Every key is larger than the last element of the sorted prefix, so its
loop exits after one test and shifts nothing. Sorted input is insertion
sort's best case: one comparison per key after the first.
