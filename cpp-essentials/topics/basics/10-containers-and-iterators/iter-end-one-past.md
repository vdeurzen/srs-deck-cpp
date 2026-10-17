---
id: iter-end-one-past
kind: basic
version: 1
level: 1
tags: [iterators]
refs:
  - https://en.cppreference.com/w/cpp/container/vector/end
  - https://en.cppreference.com/w/cpp/iterator
---

## Given `std::vector<int> v{7, 8, 9};`, which element does `v.end()` point at?

---

**None: it points one past the last element, just after the `9`.**
Iterator ranges are half-open, `[begin, end)`: `begin()` is included,
`end()` is not. So `end() - begin()` equals `size()`, an empty range has
`begin() == end()`, and `*v.end()` is undefined behaviour.
