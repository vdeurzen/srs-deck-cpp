---
id: sort-merge-sort-chunk
kind: chunk
version: 1
level: 2
tags: [idioms, sorting, merge-sort]
expose_ms: 8000
compile:
  harness: |
    #include <array>
    constexpr std::array<int, 7> sorted(std::array<int, 7> a) {
      std::array<int, 7> buf{};
      merge_sort(a.data(), a.data() + a.size(), buf.data());
      return a;
    }
    static_assert(sorted({5, 2, 7, 1, 6, 3, 4}) == std::array{1, 2, 3, 4, 5, 6, 7});
    static_assert(sorted({7, 6, 5, 4, 3, 2, 1}) == std::array{1, 2, 3, 4, 5, 6, 7});
    int main() {}
requires:
  - sort-merge-space
refs:
  - https://en.cppreference.com/w/cpp/algorithm/merge
  - https://en.wikipedia.org/wiki/Merge_sort
---

```cpp
#include <algorithm>
constexpr void merge_sort(int* first, int* last, int* buf) {
  if (last - first < 2) return;
  int* mid = first + (last - first) / 2;
  merge_sort(first, mid, buf); merge_sort(mid, last, buf);
  std::merge(first, mid, mid, last, buf);
  std::copy(buf, buf + (last - first), first);
}
```

---

Top-down merge sort: stop at size < 2, split by position, sort both
halves, then merge. The merge cannot write in place, so it goes to
`buf` and is copied back; one buffer serves every level because each
merge finishes before its caller's begins. `std::merge` takes from the
first range on ties, so this is stable. Compile-checked: the harness
sorts two arrays at compile time.
