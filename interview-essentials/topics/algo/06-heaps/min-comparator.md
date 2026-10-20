---
id: heap-min-comparator
kind: code
version: 1
level: 2
tags: [heaps, c++, containers]
requires:
  - heap-shape-and-order
  - cpp-essentials/stdalgo-comparator-strict
  - cpp-essentials/constexpr-fn-static-assert
input: chips
choices:
  c1: ["std::greater<>()", "std::less<>()", "std::ranges::less()"]
compile:
  harness: |
    static_assert(next_deadline({30, 10, 20}) == 10);
    static_assert(next_deadline({5, 40, 15, 25}) == 5);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: Where else in the standard library does passing a different comparator flip which element counts as "first"?
---

A timer queue must hand out the earliest deadline first.
`std::make_heap(b, e, comp)` rearranges `[b, e)` into a heap ordered by
`comp` (`std::less` computes `a < b`, `std::greater` computes `a > b`).
Pick the comparator that puts the earliest deadline at the front.

```cpp
#include <algorithm>
#include <functional>
#include <vector>

constexpr int next_deadline(std::vector<int> due) {
  std::make_heap(due.begin(), due.end(), {{c1::std\::greater<>()}});
  return due.front();
}
```

---

The standard heap algorithms build a **max**-heap *for the comparator*:
the front `f` is an element with no `e` such that `comp(f, e)`. With the
default `less` that is the largest; `greater` flips it, so the front is
the smallest.
