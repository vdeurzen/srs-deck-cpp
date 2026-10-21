---
id: sort-merge-sort-chunk
kind: chunk
version: 2
level: 2
tags: [idioms, sorting, merge-sort]
expose_ms: 11000
compile: null
requires:
  - interview-essentials/sort-merge-space
elaborate: Why can one buffer serve every level of the recursion, and what would allocating a fresh buffer per call cost?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/merge
  - https://en.wikipedia.org/wiki/Merge_sort
---

```cpp
if (last - first < 2) return;
int* mid = first + (last - first) / 2;
merge_sort(first, mid, buf);
merge_sort(mid, last, buf);
std::merge(first, mid, mid, last, buf);
std::copy(buf, buf + (last - first), first);
```

---

The body of top-down merge sort, `merge_sort(int* first, int* last,
int* buf)` on `[first, last)`: stop at size < 2, split by position,
sort both halves, then merge. The merge cannot write in place, so it goes to
`buf` and is copied back; one buffer serves every level because each
merge finishes before its caller's begins. `std::merge` takes from the
first range on ties, so this is stable. Graded by text: the snippet is
a function body, not a whole program.
