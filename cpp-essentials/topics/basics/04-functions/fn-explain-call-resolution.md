---
id: fn-explain-call-resolution
kind: explain
version: 1
level: 3
tags: [functions, overloading, declarations]
requires:
  - fn-declaration-vs-definition
  - fn-overload-ranking
  - fn-default-argument
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution
  - https://en.cppreference.com/w/cpp/language/default_arguments
elaborate: Name a place in your code where two overloads take an `int` and a `double`; which one does a `char` or a `float` argument reach?
---

A Go teammate finds two functions named `print` in one C++ file, one
taking an `int` and one a `double`, and asks how the compiler decides
which one a call runs. Explain it to them.

---

- [ ] Problem: one name may denote several functions, so the compiler must pick one for each call
- [ ] Mechanism: each call is checked only against the declarations seen before it
- [ ] Example: given `f(int)` and `f(double)`, a `char` argument picks `f(int)`: promotion beats conversion
- [ ] Trade-off: only trailing parameters may take default arguments, since arguments match left to right
- [ ] Pitfall: two candidates tied at the best rank make the call ambiguous: a compile error, not a guess
