---
id: transfer-interfaces-vs-concepts
kind: cloze
version: 2
level: 4
tags: [transfer, misconception, templates]
elaborate: Go's interface values carry a hidden type tag so a slice of `Shape` can hold mixed concrete types at runtime. What would the equivalent of that hidden tag be in C++, and which of today's tools actually gives you one?
requires:
  - templates-requires-clause
  - cpp-essentials/staticpoly-type-erasure
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
---

A C++20 `concept` and a Go `interface` both name the operations a type
must support. But a Go interface *value* is a runtime pair of a
{{c1::type tag}} and a pointer, which is how `[]Shape{circle, square}`
holds different concrete types and dispatches each call at run time. A
`concept` is a compile-time predicate on a template argument, like a Go
type-parameter constraint, so `std::vector<Drawable>`
{{c2::does not compile}}. Mixed concrete
types in one container need virtual functions or {{c3::type erasure}}.
