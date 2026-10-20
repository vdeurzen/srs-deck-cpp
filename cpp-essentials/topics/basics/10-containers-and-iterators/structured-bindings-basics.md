---
id: structured-bindings-basics
kind: basic
version: 1
level: 1
tags: [structured-bindings, pair, foundations]
requires:
  - pair-basics
  - types-auto-deduces
elaborate: Where would you write `auto [a, b]` instead of `.first` and `.second`, and why does it matter that it copies?
refs:
  - https://en.cppreference.com/w/cpp/language/structured_binding
---

```cpp
std::pair<int, int> p{1, 2};
auto [a, b] = p;
a = 9;
```

## `auto [a, b] = p;` declares `a` and `b` for `p`'s two members, in order. What is `p.first` now?

---

**Still 1: `auto [a, b] = p` copies p's members into two new variables.**

`a` starts as a copy of `p.first` and `b` of `p.second`, so assigning to
`a` leaves `p` unchanged. The same form unpacks a struct's members, in
the order they are declared.
