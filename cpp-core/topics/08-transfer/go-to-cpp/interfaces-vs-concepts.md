---
id: transfer-interfaces-vs-concepts
kind: cloze
version: 3
level: 4
tags: [transfer, misconception, templates]
elaborate: When would you choose a concept-constrained template over a virtual interface, and what does each cost at run time?
requires:
  - templates-requires-clause
  - staticpoly-type-erasure
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
---

A C++20 `concept` such as `Drawable` names the operations a type must
support, but it is a compile-time predicate on a template argument, not a
type. So `std::vector<Drawable>` {{c1::does not compile}}. One container
of different concrete types, each call dispatched at run time, needs
virtual functions or {{c2::type erasure}}.
