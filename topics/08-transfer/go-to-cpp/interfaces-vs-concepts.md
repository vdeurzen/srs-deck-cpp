---
id: transfer-interfaces-vs-concepts
kind: cloze
version: 1
level: 4
tags: [transfer, misconception, templates]
elaborate: Go's interface values carry a hidden type tag so a slice of `Shape` can hold mixed concrete types at runtime. What would the equivalent of that hidden tag be in C++, and which of today's tools actually gives you one?
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
---

It is tempting to treat a C++20 `concept` as "Go's `interface`, but with a
fancier name" — after all, both name a set of operations a type must
support. But a Go `interface` value is {{c1::a runtime pair of a type tag
and a pointer::often called a "fat pointer"}}, which is how
`[]Shape{circle, square}` can hold genuinely different concrete types
side by side and dispatch each call at runtime. A `concept` is
{{c2::a compile-time predicate on a template parameter::checked during
overload resolution and template instantiation, never at runtime}} — it
constrains what types a template may be instantiated with, but every
instantiation is still for one concrete `T`. `std::vector<Drawable>` for
a `concept Drawable` is not legal in the way `[]Shape` is: there is no
single `Drawable` type to store, and getting Go-style runtime mixed-type
polymorphism back needs {{c3::a virtual base class, or type erasure via
something like std\::function or std\::any::dynamic dispatch, not a
concept, is what buys back Go's "different concrete types in one
container"}}.
