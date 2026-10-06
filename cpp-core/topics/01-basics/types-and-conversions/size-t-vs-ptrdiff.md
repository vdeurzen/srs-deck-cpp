---
id: types-size-t-vs-ptrdiff
kind: basic
version: 1
level: 2
tags: [types, integers, c++20]
requires:
  - types-usual-arithmetic-conversions
refs:
  - https://en.cppreference.com/w/cpp/iterator/size
  - https://en.cppreference.com/w/cpp/types/ptrdiff_t
---

## For an empty `std::vector v`, `v.size() - 1` is `SIZE_MAX`. What is `std::ssize(v) - 1`?

---

**`-1`: `std::ssize` returns a signed type.** `size()`
returns the unsigned `std::size_t`, so the subtraction wraps.
`std::ssize` (C++20) returns `std::ptrdiff_t` (the signed type of a
pointer difference), so arithmetic and comparisons with `int` behave
like ordinary numbers.
