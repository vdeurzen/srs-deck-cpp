---
id: fn-overload-worked
kind: basic
version: 1
level: 2
tags: [functions, overloading, conversions, worked-example]
requires:
  - fn-overload-ranking
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
  - https://eel.is/c++draft/over.ics.scs
---

## Picking the overload for `f(c)`, with `char c = 'x';`

```cpp
void f(int);
void f(unsigned);
void f(double);
```

| candidate | `c` becomes | rank |
| --- | --- | --- |
| `f(int)` | `int` | promotion |
| `f(unsigned)` | `unsigned` | conversion |
| `f(double)` | `double` | conversion |
| chosen | best rank, alone | `f(int)` |

Why does `f(unsigned)` rank as a conversion, though `unsigned` is an integer type too?

---

**Only widening to `int` counts as a promotion; any other integer target is a conversion.**

Integral promotion is the fixed rule "narrower than `int` becomes `int`".
`char` → `unsigned` changes to a different integer type, so it ranks with
`char` → `double`. One candidate has the best rank, so the call is not
ambiguous.
