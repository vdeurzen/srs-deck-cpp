---
id: fn-overload-ranking
kind: basic
version: 1
level: 1
tags: [functions, overloading, conversions]
requires:
  - types-promotion-rule
elaborate: Where in your code could adding an overload silently change which function an existing call picks?
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
---

## Two functions may share a name if their parameter types differ (overloads). `void f(double);` and `void f(int);` both accept a `char`. Which one does `f(c)` call, for `char c = 'a';`?

---

**`f(int)`: exact match beats promotion, and promotion beats conversion.**

Overload resolution ranks how the argument reaches each parameter type.
`char` → `int` is a **promotion**; `char` → `double` is only a
**conversion**. If two candidates tie at the best rank, the call is
ambiguous and does not compile.
