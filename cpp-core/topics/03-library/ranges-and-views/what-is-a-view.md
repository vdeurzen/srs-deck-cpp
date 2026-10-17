---
id: ranges-what-is-a-view
kind: basic
version: 1
level: 2
tags: [ranges]
requires:
  - cpp-essentials/iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/ranges/view
  - https://eel.is/c++draft/range.view
---

## `auto f = std::views::filter(v, is_odd);` with a `std::vector<int> v`. `f` is neither a container nor an iterator. What is it, in the standard's terms?

---

**A view: a range whose move and destruction take constant time,
whatever its element count.**

You iterate it like any range (`for (int x : f)`, `begin`/`end`).
`std::views::filter` is a *range adaptor*: it takes a range and returns
a view over it. The `std::ranges::view` concept is what lets views be
passed and stored by value cheaply.
