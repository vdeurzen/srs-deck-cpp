---
id: ptr-explain-parameter-forms
kind: explain
version: 2
level: 2
tags: [pointers, references, parameters, interview]
requires:
  - ptr-bump-by-reference
  - const-ref-parameter
  - ptr-pointer-param-meaning
  - fn-mixed-param-countdown
elaborate: Pick a function you wrote recently; which parameter form would you give it now, and why?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f15-prefer-simple-and-conventional-ways-of-passing-information
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/pointer
---

An interviewer asks: a function needs one of its caller's objects. Talk
them through how you decide how the function should take it.

---

- [ ] Take a small, cheap type like `int` by value when only reading it; the copy costs nothing
- [ ] Take `T&` to change the caller's object: the parameter is another name for it, not a copy
- [ ] Take `const T&` to read a big object without the copy that taking `T` would make
- [ ] Take `T*` when "no object" is allowed: it admits `nullptr`, which the function must test first
