---
id: fn-overload-ranking
kind: basic
version: 1
level: 1
tags: [functions, overloading, conversions]
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
---

## `void f(long);` and `void f(int);` both accept a `short` argument. Which one does `f(short{2})` call?

---

**`f(int)`: exact match beats promotion, and promotion beats conversion.**

Overload resolution ranks how the argument reaches each parameter type.
`short` → `int` is a **promotion**; `short` → `long` is only a
**conversion**. If two candidates tie at the best rank, the call is
ambiguous and does not compile.
