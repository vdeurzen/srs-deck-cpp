---
id: sort-selection-unstable
kind: trace
version: 2
level: 2
tags: [tracing, sorting, selection-sort, stability]
probes:
  1: { a: "h", b: "s" }
requires:
  - sort-selection-worked
  - interview-essentials/sort-stable-meaning
  - cpp-essentials/class-struct-members
  - cpp-essentials/iter-array-fixed-size
elaborate: Insertion sort also moves elements around. Why can it never reorder two equal keys?
refs:
  - https://en.wikipedia.org/wiki/Selection_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

Pass 0 of selection sort by `rank`: find the minimum of `h` (the first
one found, on ties) and swap it into slot 0.

```cpp
struct Card { int rank; char suit; };
std::array<Card, 4> h{{{2, 's'}, {2, 'h'}, {3, 'd'}, {1, 'c'}}};
int m = 0;
for (int j = 1; j < 4; ++j)
  if (h[j].rank < h[m].rank) m = j;
const Card t = h[0]; h[0] = h[m]; h[m] = t;   // swap
char a = h[1].suit, b = h[3].suit;   // @1
```

---

The minimum is `1c` in slot 3, so the swap throws `2s`, the first 2,
from slot 0 to slot 3, past `2h`: `1c 2h 3d 2s`. Later passes order by
rank alone, and `2h` and `2s` tie, so `2h` stays ahead of `2s`.
Selection sort is not stable. (Run with GCC 16.2.)
