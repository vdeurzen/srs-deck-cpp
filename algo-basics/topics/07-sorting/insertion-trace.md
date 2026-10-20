---
id: sort-insertion-trace
kind: trace
version: 2
level: 1
tags: [tracing, sorting, insertion-sort]
probes:
  1: { p: "2", last: "8" }
requires:
  - sort-insertion-idea
  - interview-essentials/linear-array-insert-worked
  - cpp-essentials/iter-array-fixed-size
  - cpp-essentials/types-size-t
elaborate: Say in one sentence, as to an interviewer, why the loop tests `j > 0` before it reads `a[j - 1]`.
refs:
  - https://en.wikipedia.org/wiki/Insertion_sort
---

`insert(a, i)` inserts `a[i]` into the sorted prefix `a[0]` … `a[i - 1]`
and returns the slot where it lands.

```cpp
std::size_t insert(std::array<int, 5>& a, std::size_t i) {
  const int key = a[i];
  std::size_t j = i;
  while (j > 0 && a[j - 1] > key) { a[j] = a[j - 1]; --j; }
  a[j] = key;
  return j;
}
std::array a{1, 4, 6, 8, 5};    // a[0] … a[3] already sorted
std::size_t p = insert(a, 4);
int last = a[4];                // @1
```

---

5 is smaller than 8 and 6, so both shift one slot right: 8 into slot 4,
then 6 into slot 3. `4 > 5` is false, so the loop stops and 5 lands in
slot 2: `1 4 5 6 8`. Each shift moves one larger key past 5; the keys
not larger than 5 never move. (Run with GCC 16.2.)
