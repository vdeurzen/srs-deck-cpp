---
id: templates-concepts-vs-sfinae
kind: basic
version: 1
level: 3
tags: [templates, concepts]
requires:
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
---

## What do C++20 concepts give you that pre-C++20 SFINAE-based constraints did not?

---

Three things, all from making the constraint a first-class, named
language construct instead of an accident of substitution failure:

- **Readable failures**: instantiating a constrained template with the
  wrong type names the unsatisfied constraint directly, instead of
  dumping the substitution failure from deep inside `enable_if`.
- **Composability**: concepts combine with `&&`/`||` and can be named and
  reused (`std::integral`, `std::ranges::range`), where SFINAE constraints
  were usually one-off `void_t` or `enable_if` expressions per site.
- **Overload ordering by subsumption**: the compiler can tell that one
  concept logically implies another and prefer the more specific overload,
  which SFINAE has no principled way to express.

As for *what* can be checked, concepts add little: almost any predicate
expressible as a constraint was checkable with `enable_if`, just
unreadably. The real gains beyond readability are subsumption (above) and
constraining non-template members of a class template — e.g. a special
member function that is trivial only when `T`'s is — which SFINAE cannot
reach because there is nothing to substitute into.
