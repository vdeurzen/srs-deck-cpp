---
id: ub-passing-tests-prove-nothing
kind: basic
version: 2
level: 1
tags: [undefined-behaviour, misconception]
elaborate: Which code of yours has only ever been checked by "it gives the right answer when I run it"?
requires:
  - vector-basics
  - io-cout-insertion
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://en.cppreference.com/w/cpp/container/vector/operator_at
  - https://eel.is/c++draft/intro.abstract
---

Many trust code once every test passes. This prints `247`, the sum of
the three scores, on every machine tried.

```cpp
std::vector<int> scores{90, 72, 85};
int total = scores[0] + scores[1] + scores[2] + scores[3];
std::cout << total;
```

## What does `scores[3]` read: 0, an out-of-range error, or something else?

---

**Nothing defined: index 3 is past the end, so the read is undefined behaviour.**

`[]` does no bounds check and raises no error. Reading 0 was one allowed
outcome; the standard then requires nothing of the whole run, so another
compiler, flag or memory layout may print garbage, crash, or drop code.
