---
id: sort-selection-unstable
kind: trace
version: 1
level: 2
tags: [tracing, sorting, selection-sort, stability]
probes:
  1: { suits: "c h d s" }
  2: { suits: "c h s d" }
requires:
  - sort-selection-idea
  - sort-stable-meaning
elaborate: Insertion sort also moves elements around. Why can it never reorder two equal keys?
refs:
  - https://en.wikipedia.org/wiki/Selection_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

Selection sort by `rank`: each pass swaps the minimum of `h[i..]` (the
first one found, on ties) into slot `i`. At each probe give `suits`:
the four suit letters in array order.

```cpp
struct Card { int rank; char suit; };
std::array<Card, 4> h{{{2, 's'}, {2, 'h'}, {3, 'd'}, {1, 'c'}}};
auto pass = [&](std::size_t i) {
  std::size_t m = i;
  for (std::size_t j = i + 1; j < h.size(); ++j)
    if (h[j].rank < h[m].rank) m = j;
  std::swap(h[i], h[m]);
};
pass(0);            // @1
pass(1); pass(2);   // @2
```

---

Pass 0 swaps `1c` to the front and throws `2s`, the first 2, to the
back, past `2h`. The ranks end sorted (1 2 2 3), but `2h` now precedes
`2s`: a **long-distance swap** jumped one equal key over another.
Selection sort is not stable. (Run with GCC 16.2.)
