---
id: templates-explain-concepts
kind: explain
version: 2
level: 4
tags: [templates, concepts]
requires:
  - templates-explain-instantiation
  - templates-explain-constraints
  - ranges-range-categories
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/ranges/input_range
---
A library ships
`template<class C> auto total(const C& c) { typename C::value_type s{}; for (auto& x : c) s += x; return s; }`.
`total(42)` produces a wall of errors from inside the body. Walk through
why the errors look that way, what you would constrain and how, and how a
second, faster overload for contiguous containers can use
`std::ranges::data(c)` while `total` still accepts a `std::list`.
---
- [ ] `total(42)` errors inside the body, not at the call: the unconstrained template is chosen, and only instantiation substitutes `int` into `C::value_type`
- [ ] The constraint must name what the body needs of `C`, being traversable: `std::ranges::input_range<C>`, not merely "has a `value_type`", which would let a non-iterable type through to the same body errors
- [ ] With that constraint `total(42)` is rejected at the call, during overload resolution, and the error names the unsatisfied concept
- [ ] An overload on `std::ranges::contiguous_range` wins for `std::vector` without ambiguity because that concept is built from `input_range` and subsumes it
- [ ] For a `std::list` the contiguous overload is not viable and is never instantiated, so its use of `std::ranges::data(c)` is never checked against a list
