---
id: view-order-code
kind: code
version: 1
level: 3
tags: [ranges, views]
input: chips
choices:
  c1:
    - "filter(is_even) | std::views::take(3)"
    - "take(3) | std::views::filter(is_even)"
    - "take(3)"
compile:
  harness: |
    static_assert(result() == 56);
    int main() {}
requires:
  - view-pipeline-trace
  - constexpr-fn-static-assert
elaborate: Say where else the order of two pipeline stages changes the answer, not just the speed.
refs:
  - https://en.cppreference.com/w/cpp/ranges/take_view
  - https://en.cppreference.com/w/cpp/ranges/filter_view
  - https://en.cppreference.com/w/cpp/ranges/iota_view
---

The loop asks, each stage pulls from the one before, and take stops the
pull. Complete the pipeline so `result()` is the sum of the squares of the
first 3 even positive `int`s.

```cpp
#include <ranges>
constexpr int result() {
    auto is_even = [](int x) { return x % 2 == 0; };
    auto sq = [](int x) { return x * x; };
    int s = 0;
    for (int x : std::views::iota(1) | std::views::{{c1::filter(is_even) | std\::views\::take(3)}}
                                     | std::views::transform(sq))
        s += x;
    return s;
}
```

---

**Filter first, then take: `take(3)` counts only elements that passed.**
That gives 4 + 16 + 36 = 56. `take(3)` before the filter keeps 1, 2, 3, of
which only 2 is even (4). `take(3)` alone squares 1, 2, 3 (14).
