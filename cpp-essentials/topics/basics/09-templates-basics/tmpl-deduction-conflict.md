---
id: tmpl-deduction-conflict
kind: basic
version: 1
level: 2
tags: [templates, deduction]
requires:
  - tmpl-why-template
elaborate: Say two ways you could make `bigger(1, 2.5)` compile, and what each costs.
refs:
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

## The compiler *deduces* `T` at each call: it infers `T` from the arguments' types. Why does the call on the last line not compile?

```cpp
template <typename T>
T bigger(T a, T b) { if (a < b) return b; return a; }

bigger(3, 7);      // OK
bigger(1, 2.5);    // error
```

---

**Each argument deduces `T` on its own, and they disagree: `int` from
`1`, `double` from `2.5`.** Deduction does not consider conversions, so
it will not "promote" `1` to make them match; with two candidates for
`T`, deduction fails and there is no function to call.
