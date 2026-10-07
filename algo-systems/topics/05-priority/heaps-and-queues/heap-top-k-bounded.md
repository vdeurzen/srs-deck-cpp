---
id: heap-top-k-bounded
kind: code
version: 1
level: 4
requires:
  - heap-top-k-min-heap
tags: [heaps, selection]
input: chips
choices:
  c1: ["x > h.front()", "x < h.front()", "x > h.back()", "x > h[1]"]
compile:
  harness: |
    static_assert(top3({5, 1, 9, 3, 7, 2, 8, 6}) == std::array<int, 3>{9, 8, 7});
    static_assert(top3({4, 6, 5, 9, 1, 8, 7, 3}) == std::array<int, 3>{9, 8, 7});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/push_heap
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort_heap
---

`top3` reads its input once and keeps the three largest values in a
min-heap `h`. Complete the test that decides whether `x` gets in.

```cpp
#include <algorithm>
#include <array>
#include <functional>

constexpr std::array<int, 3> top3(const std::array<int, 8>& in) {
  std::array<int, 3> h{in[0], in[1], in[2]};
  std::ranges::make_heap(h, std::greater{});
  for (std::size_t i = 3; i < in.size(); ++i)
    if (const int x = in[i]; {{c1::x > h.front()}}) {
      std::ranges::pop_heap(h, std::greater{});
      h.back() = x;
      std::ranges::push_heap(h, std::greater{});
    }
  std::ranges::sort_heap(h, std::greater{});
  return h;
}
```

---

With `std::greater` the heap's front is its **minimum**, the weakest of
the three kept — exactly the item a newcomer must beat, so one comparison
decides the common case. `pop_heap` moves that minimum to the back, where
it is overwritten; `push_heap` sifts the newcomer into place: O(log k).

`h.back()` and `h[1]` are leaves, only known to be no smaller than the
root, so testing them rejects a newcomer that beats the minimum but not
that leaf. `x < h.front()` keeps
the smallest. `sort_heap` with `std::greater` leaves the result
descending.
