---
id: rng-named-range-code
kind: code
version: 1
level: 3
tags: [algorithms, ranges, lifetime]
input: chips
choices:
  c1:
    - "v"
    - "load()"
    - "std::vector<int>{4, 9, 2}"
compile:
  harness: |
    static_assert(max_of_load() == 9);
    int main() {}
requires:
  - rng-dangling-symptom
  - constexpr-fn-static-assert
elaborate: Say where else in your code a function's returned vector is searched directly, and whether the result outlives it.
refs:
  - https://en.cppreference.com/w/cpp/ranges/dangling
  - https://en.cppreference.com/w/cpp/algorithm/ranges/max_element
---

Complete the call so `max_of_load` returns the largest value `load()`
produces.

```cpp
#include <algorithm>
#include <vector>
constexpr std::vector<int> load() { return {4, 9, 2}; }

constexpr int max_of_load() {
    std::vector<int> v = load();
    auto it = std::ranges::max_element({{c1::v}});
    return *it;
}
```

---

**`v` is a named vector, so `max_element` returns a real iterator into it.**
`load()` and `std::vector<int>{4, 9, 2}` hold the right values but are
temporaries, destroyed at the `;`. For both the result is
`std::ranges::dangling`, which has no `*`, so the return line doesn't
compile.
