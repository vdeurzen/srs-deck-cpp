---
id: ub-standard-imposes-nothing
kind: basic
version: 1
level: 1
tags: [undefined-behaviour]
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://eel.is/c++draft/intro.abstract
---

## A run of a C++ program performs one operation with undefined behaviour. What does the standard require of that run?

---

**Nothing at all, for the whole run.** No crash, no error message, not
even correct output from the statements before it. The compiler is not
obliged to warn either. "Undefined" means the standard has stepped out:
whatever happens is allowed.
