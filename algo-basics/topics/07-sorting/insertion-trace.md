---
id: sort-insertion-trace
kind: trace
version: 1
level: 1
tags: [tracing, sorting, insertion-sort]
probes:
  1: { a: "2 4 5 6 1 3" }
  2: { a: "1 2 4 5 6 3", s: "4" }
  3: { s: "3" }
requires:
  - sort-insertion-idea
refs:
  - https://en.wikipedia.org/wiki/Insertion_sort
---

`insert(a, i)` inserts `a[i]` into the sorted prefix `a[0, i)` and
returns how many elements it shifted. Write arrays as space-separated
values.

```cpp
auto insert = [](std::array<int, 6>& a, std::size_t i) {
  const int key = a[i];
  std::size_t j = i;
  int shifted = 0;
  while (j > 0 && a[j - 1] > key) { a[j] = a[j - 1]; --j; ++shifted; }
  a[j] = key;
  return shifted;
};
std::array a{5, 2, 4, 6, 1, 3};
insert(a, 1); insert(a, 2); insert(a, 3);   // @1
int s = insert(a, 4);                       // @2
s = insert(a, 5);                           // @3
```

---

After three insertions the first four elements are sorted and the tail
is untouched. 1 is smaller than the whole prefix, so it shifts all 4;
3 shifts past 6, 5 and 4, then `2 > 3` is false and it stops. Each
shift fixes exactly one pair that was out of order (an **inversion**).
(Run with GCC 16.2.)
