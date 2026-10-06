---
id: coroutines-generator-range-for-rescue
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes]
requires:
  - coroutines-generator-dangling-parameter
refs:
  - https://wg21.link/p2718r0
  - https://en.cppreference.com/w/cpp/language/range-for
---

## `for (char c : chars(std::string{"hi"}))`, with `chars` taking `const std::string&`, reads freed memory on GCC 14 but is correct on GCC 15. What changed?

---

**C++23's P2718R0: every temporary in a range-for's range-initialiser
now lives to the end of the loop.** The string is rescued by the
*loop*, not by the frame — and only where the paper is implemented
(GCC 15, Clang 19; GCC 14 still destroys it before the first
`co_yield`). Move the call to its own statement and the rescue is gone.
