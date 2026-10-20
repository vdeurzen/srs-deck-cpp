---
id: stdalgo-mixed-first-over-limit
kind: basic
version: 1
level: 2
tags: [algorithms, lambdas, recognition]
requires:
  - stdalgo-find-if-no-match
  - lambda-syntax-intro
elaborate: Say what would change if the code needed every order over the limit, not just the first.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/find
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---

## A `std::vector<int>` holds order prices. Given a `limit` read at run time, the code needs the first price above it, or to know there is none. What do you write?

---

**`std::find_if` with `[limit](int p) { return p > limit; }`, then compare with `end()`.**

The cue is "first element meeting a condition". `std::find` compares with
one fixed value only; the test here needs `limit`, so the lambda expression
captures it.
