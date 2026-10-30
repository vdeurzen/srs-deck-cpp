---
id: ptr-explain-parameter-forms
kind: explain
version: 1
level: 2
tags: [pointers, references, parameters, interview]
requires:
  - ptr-bump-by-reference
  - const-ref-parameter
  - ptr-pointer-param-meaning
elaborate: Pick a function you wrote recently; which parameter form would you give it now, and why?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f15-prefer-simple-and-conventional-ways-of-passing-information
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/pointer
---

An interviewer asks: a function needs one of its caller's objects. Talk
them through how you decide how the function should take it.

---

- [ ] The parameter form tells the caller what the function will do with their object
- [ ] A reference parameter is another name for the caller's object, not a copy
- [ ] So `T&` is for changing it: a `bump(int&)` raises the caller's counter, called plainly as `bump(x)`
- [ ] `const T&` reads a big object without the copy that taking `T` would make
- [ ] `T*` admits `nullptr`, so the function must test for null before using it
