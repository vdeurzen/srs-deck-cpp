---
id: ub-passing-tests-prove-nothing
kind: basic
version: 1
level: 1
requires:
  - ub-standard-imposes-nothing
tags: [undefined-behaviour, misconception]
elaborate: Which code of yours has only ever been checked by "it gives the right answer when I run it"?
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://eel.is/c++draft/intro.abstract
---

## A loop reads `scores[10]` from a 10-element array. The program prints the right total in every test, on every machine you tried. Is it correct?

---

**No. Reading past the end is undefined behaviour, and "seems to work" is
one of its allowed outcomes.** The standard then requires nothing of the
whole run. A new compiler version, an optimisation flag or a different
memory layout may turn it into garbage, a crash, or missing code.
