---
id: fn-overload-integer-belief
kind: basic
version: 1
level: 3
tags: [functions, overloading, conversions, misconception]
requires:
  - fn-overload-ranking
elaborate: When two overloads of yours tie for some argument type, what would you change so callers get no ambiguity error?
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Best_viable_function
  - https://eel.is/c++draft/over.match.best
---

Many expect a `char` argument to go to the integer overload whenever one exists.

```cpp
int f(unsigned) { return 1; }
int f(double)   { return 2; }

char c = 'a';
int r = f(c);
```

## Does `f(c)` call `f(unsigned)`, call `f(double)`, or fail to compile?

---

**It fails to compile: the call is ambiguous.**

`char` → `unsigned` and `char` → `double` are both plain conversions, the
same rank, so neither candidate is better. The belief is tempting because
an integer target feels closer, but overload resolution compares ranks,
not how similar the types look.
