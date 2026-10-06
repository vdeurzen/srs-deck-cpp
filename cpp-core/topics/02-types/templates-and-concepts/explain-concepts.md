---
id: templates-explain-concepts
kind: explain
version: 1
level: 4
tags: [templates, concepts]
requires:
  - templates-requires-expression
  - templates-two-phase-lookup
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
---
Explain templates and concepts to a senior interviewer: what a template
is, why constraining one matters, and how concepts changed the story from
SFINAE.
---
- [ ] A template is a blueprint; instantiation generates real code per set of arguments
- [ ] Implicit instantiation happens on first use with a given set of arguments
- [ ] Only members of a class template actually used get instantiated
- [ ] Pre-C++20, constraining a template meant SFINAE (`enable_if`, `void_t`), which fails silently rather than erroring cleanly
- [ ] A concept is a named, compile-time predicate over template parameters, checked with `requires`
- [ ] Concepts give readable errors: the unsatisfied concept is named directly, not a substitution-failure dump
- [ ] Concepts support subsumption: the compiler can prefer a more specific concept over a more general one during overload resolution
- [ ] Two-phase lookup: dependent names are resolved at instantiation, which is why `typename`/`template` disambiguators exist
