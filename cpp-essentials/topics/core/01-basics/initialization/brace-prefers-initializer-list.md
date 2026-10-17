---
id: initialization-brace-prefers-initializer-list
kind: basic
version: 1
level: 2
tags: [initialization, containers]
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization
  - https://en.cppreference.com/w/cpp/container/vector/vector
elaborate: Where in your own code does a brace-initialized container take two integers, and which constructor did you mean?
---

```cpp
std::vector<int> a(4, 9);
std::vector<int> b{4, 9};
```

## What do `a` and `b` hold?

---

**`a` is `[9, 9, 9, 9]`; `b` is `[4, 9]`.** Parentheses pick the
`(count, value)` constructor. With braces, a constructor taking
`std::initializer_list<int>` wins over every other constructor whenever
the values can be elements, so `b` gets two elements.
