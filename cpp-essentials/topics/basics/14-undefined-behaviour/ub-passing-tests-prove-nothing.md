---
id: ub-passing-tests-prove-nothing
kind: basic
version: 1
level: 1
tags: [undefined-behaviour, misconception]
elaborate: Which code of yours has only ever been checked by "it gives the right answer when I run it"?
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://eel.is/c++draft/intro.abstract
---

```cpp
int scores[5] = {90, 72, 85, 64, 99};
int total = 0;
for (int i = 0; i <= 5; ++i) total += scores[i];
std::cout << total;
```

## On every machine you tried, this prints `410`, the right sum, and every test passes. What may it print built by another compiler, or with other flags?

---

**Anything, or nothing: `i <= 5` reads `scores[5]`, past the end, which
is undefined behaviour.** "Seems to work" is one allowed outcome. The
standard then requires nothing of the whole run, so a new compiler,
optimisation flag or memory layout may print garbage, crash, or drop
code.
