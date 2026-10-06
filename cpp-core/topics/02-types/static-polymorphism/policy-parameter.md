---
id: staticpoly-policy-parameter
kind: basic
version: 1
level: 2
tags: [polymorphism, templates]
requires:
  - staticpoly-static-vs-dynamic
refs:
  - https://en.cppreference.com/w/cpp/container/set
  - https://en.cppreference.com/w/cpp/named_req/Compare
---

## `std::set<K, Compare>` takes its comparator as a template parameter, not a pointer to a virtual `Comparator`. What does each comparison cost?

---

**A direct call into `Compare::operator()`, usually inlined: no
indirection, no vtable.**

This is a **policy**: behaviour chosen by a template argument, so each
policy gets its own instantiation. The price is that `set<int, Less>` and
`set<int, Greater>` are unrelated types.
