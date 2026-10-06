---
id: chunks-ranges-pipeline
kind: chunk
version: 1
level: 3
tags: [idioms, ranges]
requires:
  - ranges-views-composition-cloze
expose_ms: 8000
compile:
  harness: |
    int main() {
      std::vector<int> v{1, 2, 3, 4, 5};
      int sum = 0;
      for (int x : evens_doubled(v)) sum += x;
      return sum == 12 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/ranges/filter_view
  - https://en.cppreference.com/w/cpp/ranges/transform_view
---

```cpp
#include <ranges>
#include <vector>
auto evens_doubled(const std::vector<int>& v) {
  return v | std::views::filter([](int x) { return x % 2 == 0; })
           | std::views::transform([](int x) { return x * 2; });
}
```

---

The ranges pipeline idiom: `|` composes adaptors left to right, each
producing a lazy view rather than a new container. Nothing here allocates
or even runs until something iterates the result — the range-for in the
harness is what actually pulls values through `filter` then `transform`,
one element at a time.
