---
id: vc-lvalue-has-identity
kind: basic
version: 1
level: 1
tags: [value-categories]
requires:
  - ptr-amp-and-star-cloze
elaborate: Say in one sentence why "has a name" and "has an address" are good first tests for an lvalue.
refs:
  - https://en.cppreference.com/w/cpp/language/value_category#Primary_categories
  - https://eel.is/c++draft/expr.unary.op#3
---

## With `int n = 4;`, `&n` compiles but `&(n + 1)` is an error. What does the expression `n` have that `n + 1` lacks?

---

**Identity: `n` names an object that exists in memory, so it is an
*lvalue*.** `n + 1` only computes a value; no object holds it that you
could point to, so it is a *prvalue* ("pure" value). Built-in `&` needs
an lvalue operand. This split, the *value category*, belongs to every
expression, separately from its type: both are `int`.
