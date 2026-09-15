---
id: ranges-filter-transform-pipeline
kind: code
version: 1
level: 3
tags: [ranges]
input: chips
choices:
  c1: ["x % 2 == 0", "x % 2 != 0", "x > 5", "true"]
compile:
  harness: |
    static_assert(sums_to_60());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/ranges/filter_view
  - https://en.cppreference.com/w/cpp/ranges/transform_view
---

Complete the predicate so the pipeline keeps only the even numbers,
multiplies each by ten, and sums to `60`.

```cpp
#include <ranges>
constexpr bool sums_to_60() {
    int a[]{1, 2, 3, 4, 5};
    auto v = a | std::views::filter([](int x){ return {{c1::x % 2 == 0}}; })
               | std::views::transform([](int x){ return x * 10; });
    int sum = 0;
    for (int x : v) sum += x;
    return sum == 60;
}
```

---

`filter` and `transform` compose left to right with `|`: only `2` and `4`
survive the predicate, each becomes `20` and `40` under the transform, and
the range-for sums the lazily-produced results — nothing is materialised
into a container at any point.
