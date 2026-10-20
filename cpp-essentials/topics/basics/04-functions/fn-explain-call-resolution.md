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

- [ ] Problem: one name with different parameter types needs a pick for each call
- [ ] Mechanism: the compiler ranks each argument's conversion to each candidate: exact match, promotion, conversion
- [ ] Example: a `char` argument picks `f(int)` over `f(double)`, since promotion beats conversion
- [ ] Cost: adding an overload can silently change which function an existing call picks
- [ ] Pitfall: two candidates tied at the best rank make the call ambiguous: a compile error
