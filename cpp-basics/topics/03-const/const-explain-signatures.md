---
id: const-explain-signatures
kind: explain
version: 1
level: 2
tags: [const]
requires:
  - const-ref-parameter
  - const-fixed-pointer
  - const-observer-chunk
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
---

A reviewer asks why your code has `const` in so many places. Walk through
each place `const` can appear in a declaration and what it promises.
---
- [ ] A `const` variable must be initialized where declared and can never be assigned afterwards
- [ ] A `const T&` parameter gives read-only access to the caller's object without copying it
- [ ] `const T*` (or `T const*`): the pointee is read-only, the pointer may move
- [ ] `T* const`: the pointer is fixed, the pointee stays writable
- [ ] A trailing `const` on a member function makes it callable on a `const` object or through a `const&`
