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
  - ub-definition
elaborate: Pick a function you wrote recently; which of the four parameter forms would you give it now, and why?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f15-prefer-simple-and-conventional-ways-of-passing-information
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/pointer
---

An interviewer asks: a function needs one of its caller's objects. How do
you choose between taking it as `T`, `T&`, `const T&` or `T*`?

---

- [ ] Problem: the parameter form tells the caller what the function will do with their object
- [ ] Mechanism: a reference parameter is another name for the caller's object, not a copy
- [ ] Example: a `bump` taking `int&` raises the caller's counter, called plainly as `bump(x)`
- [ ] Trade-off: `const T&` reads a big object without the copy that `T` would make
- [ ] Pitfall: `T*` admits `nullptr`, so the function must test for null before using it
