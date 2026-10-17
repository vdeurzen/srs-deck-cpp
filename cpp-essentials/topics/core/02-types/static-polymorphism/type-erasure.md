---
id: staticpoly-type-erasure
kind: basic
version: 1
level: 3
tags: [polymorphism, type-erasure]
requires:
  - staticpoly-static-vs-dynamic
  - lambda-store-std-function
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/any
---

## Shapes from many libraries, including ones written later, share no base class but all have `area()`. Which technique lets one `std::vector` hold any of them, by value?

---

**Type erasure: a wrapper (like `std::function`) that stores any `T` with
`area()` behind an internal virtual interface.**

It is the inverse trade of templates: one type at the call site, run-time
dispatch inside, and usually a heap allocation per object. For a closed
list of types known up front, `std::variant` would do; an open set needs
erasure.
