---
id: sort-heap-trace
kind: trace
version: 2
level: 2
tags: [tracing, sorting, heap-sort]
probes:
  1: { top: "8", last: "9" }
requires:
  - interview-essentials/sort-heap-sort
  - heap-pop-worked
  - cpp-essentials/iter-array-fixed-size
  - interview-essentials/sort-std-swap
elaborate: Say in one sentence, as to an interviewer, why heap sort needs no second array, unlike merge sort.
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/sort_heap
---

One heap-sort step on a max-heap. `sift_down(a, i, n)` sinks `a[i]`
within the heap `a[0]` … `a[n - 1]`.

```cpp
void sift_down(std::array<int, 5>& a, int i, int n) {
  while (2 * i + 1 < n) {
    int c = 2 * i + 1;                          // larger child
    if (c + 1 < n && a[c + 1] > a[c]) ++c;
    if (a[i] >= a[c]) break;
    std::swap(a[i], a[c]);
    i = c;
  }
}
std::array a{9, 5, 8, 1, 3};                    // a max-heap
std::swap(a[0], a[4]);
sift_down(a, 0, 4);
int top = a[0], last = a[4];                    // @1
```

---

The swap moves the maximum, 9, into the last slot, where it stays: the
sorted suffix. The heap shrinks to `a[0]` … `a[3]`, and 3 sinks below its
larger child 8, leaving `8 5 3 1 | 9`. Each step costs one swap plus at
most log₂ n sift levels. (Run with GCC 16.2.)
