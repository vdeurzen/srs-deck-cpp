---
id: fn-explain-call-resolution
kind: explain
version: 2
level: 4
tags: [functions, overloading, interview]
requires:
  - fn-overload-ranking
  - fn-overload-add-changes-call
  - fn-overload-integer-belief
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution
  - https://eel.is/c++draft/over.match.best
elaborate: Name a place in your code where two overloads take an `int` and a `double`; which one does a `char` or an `unsigned` argument reach?
---

An interviewer finds two functions named `print` in one C++ file, one
taking an `int` and one a `double`, and asks how the compiler decides
which one a call runs. Explain it to them.

---

- [ ] The compiler picks one `print` for each call, at compile time, from the argument types
- [ ] It ranks each argument's conversion to each candidate: exact match, then promotion, then conversion
- [ ] A `char` argument picks `print(int)` over `print(double)`, since promotion beats conversion
- [ ] Two candidates tied at the best rank make the call ambiguous: a compile error
- [ ] Adding an overload can silently change which function an existing call picks
