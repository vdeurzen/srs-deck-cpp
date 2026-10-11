---
id: ranges-views-lazy-cloze
kind: cloze
version: 1
level: 2
tags: [ranges]
requires:
  - ranges-what-is-a-view
  - cpp-basics/stdalgo-lambda-syntax
refs:
  - https://en.cppreference.com/w/cpp/ranges
  - https://en.cppreference.com/w/cpp/ranges/filter_view
---

```cpp
std::vector<int> v{1, 2, 3};
auto f = v | std::views::filter([](int x) { std::puts("test"); return x > 1; });
```

These two lines print nothing: `std::views::filter` is
{{c1::lazy::an evaluation strategy}}.
