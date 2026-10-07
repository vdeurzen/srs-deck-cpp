---
id: heap-min-comparator
kind: code
version: 1
level: 2
tags: [heaps, c++, containers]
requires:
  - heap-shape-and-order
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
---

A timer queue must hand out the earliest deadline first. Pick the
comparator that puts it at the heap's front.

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
the smallest. `std::priority_queue<int, std::vector<int>, std::greater<>>`
is the min-queue for the same reason.

Go's `container/heap` reads the other way: it pops the element `Less`
ranks first, so a min-heap uses `<`.
