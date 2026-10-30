---
id: templates-explain-constraints
kind: explain
version: 1
level: 4
tags: [templates, concepts, overload-resolution]
requires:
  - templates-concepts-vs-sfinae
  - templates-subsumption-overload
  - templates-conditionally-trivial
elaborate: Where in code you know would a more-constrained overload replace an `enable_if` or tag-dispatch trick?
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/language/overload_resolution
---
A colleague asks what a C++20 constraint gives them over `enable_if` when
the compiler chooses between overloads. Explain it to them.
---
- [ ] As filters they are equivalent: an unsatisfied constraint makes a candidate non-viable, like a substitution failure
- [ ] But the error names the unsatisfied concept, where `enable_if` can only report a substitution failure
- [ ] Between viable candidates that otherwise tie, the more constrained one wins; overlapping `enable_if` conditions stay ambiguous
- [ ] Subsumption sees only through concept names; the same test as a conjunction of raw traits is ambiguous again
- [ ] Constraints also choose between non-template members, such as two destructors of a class template; SFINAE cannot
