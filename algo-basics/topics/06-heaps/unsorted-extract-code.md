---
id: heap-unsorted-extract-code
kind: code
version: 1
level: 2
tags: [foundations, heaps, priority-queue, arrays, complexity]
requires:
  - heap-pq-adt-trace
input: chips
choices:
  c1: ["a[m] = a.back();", "a.back() = a[m];", "std::swap(a[0], a.back());", "a[m] = a[0];"]
compile:
  harness: |
    constexpr bool drains_sorted() {
      std::vector<int> a{40, 15, 70, 5, 20};
      const int want[]{5, 15, 20, 40, 70};
      for (int w : want)
        if (extract_min(a) != w) return false;
      return a.empty();
    }
    static_assert(drains_sorted());
    int main() {}
refs:
  - https://xlinux.nist.gov/dads/HTML/priorityque.html
  - https://en.cppreference.com/w/cpp/container/vector/pop_back
---

A min-priority queue kept as an **unsorted** vector: insert is
`push_back`. Extract-min finds the smallest key at slot `m`. Complete the
line that removes it.

```cpp
#include <cstddef>
#include <utility>
#include <vector>

constexpr int extract_min(std::vector<int>& a) {
  std::size_t m = 0;
  for (std::size_t i = 1; i < a.size(); ++i)
    if (a[i] < a[m]) m = i;
  const int min = a[m];
  {{c1::a[m] = a.back();}}
  a.pop_back();
  return min;
}
```

---

The array has no order to preserve, so the last element can fill the
hole and `pop_back` drops the duplicate: O(1), no shifting. The scan
still reads every key, so **insert O(1), extract-min O(n)**.

`a.back() = a[m]` leaves the minimum in the array (5 comes out twice);
swapping `a[0]` with the back removes the front key, not the minimum.
