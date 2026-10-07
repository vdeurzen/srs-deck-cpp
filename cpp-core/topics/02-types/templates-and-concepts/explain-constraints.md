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
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/language/overload_resolution
---
Explain to a colleague how a C++20 constraint takes part in choosing an
overload, and what that gives you over `enable_if`.
---
- [ ] An `enable_if` drops a candidate as a side effect of substitution failure, so the error can only say substitution failed; an unsatisfied concept is named in the error
- [ ] As filters they are equivalent: an unsatisfied constraint makes a candidate non-viable, just as a substitution failure does
- [ ] Between viable candidates that otherwise tie, the more constrained one wins (subsumption); `enable_if` has no such ranking, so overlapping conditions are ambiguous
- [ ] Subsumption sees only through concepts built from other concepts; the same test written as a conjunction of raw traits is ambiguous again
- [ ] Constraints also choose between non-template members of a class template, such as a trivial defaulted destructor for trivially destructible `T` beside a user-provided one; SFINAE cannot, since there is nothing to substitute
