---
id: tmpl-explicit-argument-intro
kind: basic
version: 1
level: 2
tags: [templates, deduction]
requires:
  - tmpl-deduction-conflict
elaborate: Say when you would rather change an argument, writing `4.0`, than write `<double>` at the call.
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Template_argument_deduction
  - https://eel.is/c++draft/temp.arg.explicit
---

## Without changing `smaller` or its two arguments, how do you make the last call compile with `T` = `double`?

```cpp
template <typename T>
T smaller(T a, T b) { if (b < a) return b; return a; }

smaller(4, 0.5);   // error
```

---

**Write the template argument yourself, in angle brackets: `smaller<double>(4, 0.5)`.**

An explicit template argument fixes `T`, so nothing is deduced for it.
The arguments are then ordinary function arguments and convert as usual:
`4` becomes `4.0`.
