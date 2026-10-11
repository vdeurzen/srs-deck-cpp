---
id: sort-bubble-vs-insertion
kind: trace
version: 1
level: 2
tags: [tracing, sorting, insertion-sort, bubble-sort]
probes:
  1: { b: "15" }
  2: { i: "9" }
requires:
  - sort-insertion-cases
  - sort-bubble-invariant
elaborate: Both sorts are stable, Θ(n) best and Θ(n²) worst. Where would you still ever pick bubble sort?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Bubble_sort
---

Bubble sort swaps adjacent out-of-order pairs, pass after pass, and
stops after a pass with no swap. Insertion sort swaps each new element
left until it fits. Both count comparisons, here for 6 elements.

```cpp
auto bubble = [](std::array<int, 6> a) {
  int c = 0; bool swapped = true;
  for (std::size_t n = 6; swapped && n > 1; --n) {
    swapped = false;
    for (std::size_t j = 1; j < n; ++j)
      if (++c, a[j - 1] > a[j]) { std::swap(a[j - 1], a[j]); swapped = true; }
  }
  return c;
};
auto insertion = [](std::array<int, 6> a) {
  int c = 0;
  for (std::size_t i = 1; i < 6; ++i)
    for (std::size_t j = i; j > 0 && (++c, a[j - 1] > a[j]); --j) std::swap(a[j - 1], a[j]);
  return c;
};
int b = bubble({2, 3, 4, 5, 6, 1});        // @1
int i = insertion({2, 3, 4, 5, 6, 1});     // @2
```

---

The deciding property: **bubble sort moves a small element only one
slot left per pass**, so the trailing 1 needs 5 passes: 5 + 4 + 3 + 2 +
1 = 15. Insertion sort carries it home in one insertion: 4 + 5 = 9.
Each swap fixes one inversion in both, so both make 5 swaps; bubble
just pays more comparisons. (Run with GCC 16.2.)
