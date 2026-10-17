---
id: ptr-explain-parameter-forms
kind: explain
version: 1
level: 2
tags: [pointers, references, parameters]
requires:
  - ptr-bump-by-reference
  - const-ref-parameter
  - ptr-pointer-param-meaning
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f15-prefer-simple-and-conventional-ways-of-passing-information
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/pointer
---

A function needs one of its caller's objects. How do you choose between
taking it as `T`, `T&`, `const T&` or `T*`?

---

- [ ] `T` (by value): the function works on its own copy, so the caller's object cannot change; right for small types such as `int`
- [ ] `T&`: the parameter is the caller's object under another name, so writes reach the caller, who passes the object plainly (`f(x)`)
- [ ] `const T&`: reads the caller's object without copying it; any write through it is a compile error
- [ ] `T*`: chosen when "no object" is a valid argument; the caller passes `&x` or `nullptr`
- [ ] With `T*`, the function must test for `nullptr` before every `*` or `->`, because dereferencing null is undefined behaviour
