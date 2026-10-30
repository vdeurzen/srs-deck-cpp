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
- [ ] `const` turns an accidental write into a compile error
- [ ] A `const` object gets its value where it is declared and is never written again
- [ ] A `const&` parameter lets the callee read the caller's object without copying it or changing it
- [ ] A trailing `const` marks a member function read-only, so it can be called on `const` objects
- [ ] Where `const` sits says what is frozen: `int* const p` fixes the pointer, not the `int`
