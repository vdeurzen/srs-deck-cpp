---
id: templates-explain-concepts
kind: explain
version: 3
level: 4
tags: [templates, concepts]
requires:
  - templates-explain-instantiation
  - templates-explain-constraints
  - ranges-range-categories
elaborate: Which template in your own code would you constrain first, and which concept would name what its body needs?
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/ranges/input_range
---
A library ships
`template<class C> auto total(const C& c) { typename C::value_type s{}; for (auto& x : c) s += x; return s; }`.
`total(42)` produces a wall of errors from inside the body. An interviewer
asks how you would use concepts to improve `total`. Explain it to them.
---
- [ ] Unconstrained, `total` is chosen for `int`, and only instantiation hits `C::value_type`, deep inside the body
- [ ] The constraint should name what the body needs: `std::ranges::input_range<C>`, a type it can iterate
- [ ] Then `total(42)` is rejected at the call, during overload resolution, and the error names the unsatisfied concept
- [ ] A `std::ranges::contiguous_range` overload adds a fast path; it subsumes `input_range`, so `std::vector` picks it unambiguously
- [ ] A `std::list` still reaches the general overload: the fast one is not viable, so its body is never instantiated
