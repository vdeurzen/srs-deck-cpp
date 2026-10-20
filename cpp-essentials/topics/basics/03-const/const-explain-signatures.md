---
id: const-explain-signatures
kind: explain
version: 1
level: 2
tags: [const]
requires:
  - const-ref-parameter
  - const-fixed-pointer
  - const-member-on-const-ref
  - const-needs-initializer
elaborate: Pick one function in your code with no `const` anywhere; which `const` would you add first, and what would it catch?
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
---

A reviewer asks why your code has `const` in so many places. Explain to
them what `const` buys you.
---
- [ ] Problem: `const` turns an accidental write into a compile error
- [ ] Mechanism: a `const` object must get its value where it is declared and is never written again
- [ ] Example: a `const&` parameter lets the callee read the caller's object, uncopied and unchangeable
- [ ] Cost: `const` spreads: every read-only member function needs a trailing `const`, or `const` callers cannot call it
- [ ] Contrast: in `int* const p`, the `const` freezes the pointer, not the `int` it points to
