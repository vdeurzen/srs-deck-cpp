---
id: tmpl-error-at-instantiation
kind: basic
version: 1
level: 2
tags: [templates, instantiation, diagnostics]
requires:
  - templates-instantiation
  - class-struct-members
elaborate: Recall a long template error you have seen and say where in it the real cause usually sits.
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Implicit_instantiation
  - https://eel.is/c++draft/temp.res.general
---

## The template compiles on its own (and `a < b` on a struct compiles only if the struct defines `operator<`). Where does the compiler report the error for the last line?

```cpp
template <typename T>
T lesser(T a, T b) { if (b < a) return b; return a; }

struct Point { int x, y; };
Point p{1, 2}, q{3, 4};
Point m = lesser(p, q);   // error
```

---

**Inside `lesser`'s body, at `b < a`, while generating `lesser<Point>`.**
Code that depends on `T` is only checked once a real type is substituted
for it, and `Point` has no `<`. The call line appears only as a
"required from here" note, so the caller has to read the template's body
to learn what `T` needed.
