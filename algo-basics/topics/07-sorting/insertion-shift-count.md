---
id: sort-insertion-shift-count
kind: trace
version: 1
level: 1
tags: [foundations, tracing, sorting, insertion-sort]
probes:
  1: { x: "6" }
  2: { y: "7" }
requires:
  - sort-inversion-count
  - sort-insertion-idea
elaborate: Your input is a log that is sorted except for a few late arrivals. What does this predict insertion sort costs on it?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://algs4.cs.princeton.edu/21elementary/
---

`shifts(a)` insertion-sorts a copy of `a`: each value slides left past
every larger value before it. It counts the one-slot moves.

```cpp
constexpr int shifts(std::array<int, 5> a) {
  int s = 0;
  for (std::size_t i = 1; i < a.size(); ++i) {
    const int key = a[i];
    std::size_t j = i;
    while (j > 0 && a[j - 1] > key) { a[j] = a[j - 1]; --j; ++s; }
    a[j] = key;
  }
  return s;
}
int x = shifts({3, 5, 1, 4, 2});   // @1
int y = shifts({5, 2, 3, 4, 1});   // @2
```

---

**Shifts = inversions** (pairs `i < j` with `a[i] > a[j]`): 6 and 7.
Each shift moves `key` past exactly one larger value on its left, which
undoes exactly one inversion and touches no other pair. So insertion
sort costs Θ(n + inversions): linear on nearly sorted input.
(Run with GCC 16.2.)
