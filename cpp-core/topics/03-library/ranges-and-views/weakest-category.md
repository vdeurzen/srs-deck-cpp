---
id: ranges-weakest-category
kind: code
version: 1
level: 3
tags: [ranges, concepts]
input: chips
choices:
  c1: ["forward_range", "input_range", "bidirectional_range", "random_access_range"]
compile:
  harness: |
    #include <array>
    #include <forward_list>
    #include <sstream>
    template<class R>
    concept Accepts = requires(R r) { above_mean(r); };
    static_assert(above_mean(std::array{1, 2, 3, 6}) == 1);
    static_assert(Accepts<std::forward_list<int>&>);
    static_assert(!Accepts<std::ranges::istream_view<int>&>);
    int main() {}
requires:
  - ranges-range-categories
refs:
  - https://en.cppreference.com/w/cpp/ranges/forward_range
  - https://en.cppreference.com/w/cpp/ranges/input_range
---

`above_mean` walks its argument twice. Constrain `R` as weakly as is
still correct.

```cpp
#include <ranges>
template<std::ranges::{{c1::forward_range}} R>
constexpr int above_mean(R&& r) {
    int sum = 0, n = 0;
    for (int x : r) { sum += x; ++n; }
    int count = 0;
    for (int x : r) count += x * n > sum;
    return count;
}
```

---

Two passes need the multi-pass guarantee, which starts at
`forward_range`. `input_range` also accepts an `istream_view`, whose
second loop silently sees nothing, so the function returns 0. Anything
stronger rejects valid arguments: a `std::forward_list` is only a
forward range. The weakest correct constraint is the widest correct
interface.
