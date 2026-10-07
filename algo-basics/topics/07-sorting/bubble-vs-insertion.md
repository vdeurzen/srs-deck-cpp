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
elaborate: Both sorts are stable, Θ(n) best and Θ(n²) worst. Where would you still ever pick bubble sort?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Bubble_sort
---

Bubble sort swaps adjacent out-of-order pairs, pass after pass, and
stops after a pass with no swap. `comparisons` is the insertion-sort
counter from the insertion-cases Card, here for 6 elements.

```cpp
auto bubble = [](std::array<int, 6> a) {
  int c = 0;
  bool swapped = true;
  for (std::size_t n = a.size(); swapped && n > 1; --n) {
    swapped = false;
    for (std::size_t j = 1; j < n; ++j)
      if (++c, a[j - 1] > a[j]) { std::swap(a[j - 1], a[j]); swapped = true; }
  }
  return c;
};
int b = bubble({2, 3, 4, 5, 6, 1});        // @1
int i = comparisons({2, 3, 4, 5, 6, 1});   // @2
```

---

The deciding property: **bubble sort moves a small element only one
slot left per pass**, so the trailing 1 needs 5 passes: 5 + 4 + 3 + 2 +
1 = 15. Insertion sort carries it home in one insertion: 4 + 5 = 9.
Each swap or shift fixes one inversion in both; bubble just pays more
comparisons and three writes per swap. (Run with GCC 16.2.)
