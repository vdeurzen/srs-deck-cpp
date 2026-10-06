---
id: exceptions-far-away-failure
kind: basic
version: 1
level: 2
tags: [exceptions, error-handling]
requires:
  - exceptions-unwinding-destroys-locals
  - vocab-expected-carries-error
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/utility/expected
---

## Ten calls deep in start-up, the config file turns out to be missing, and only `main` can do anything about it. Exception or `std::expected`?

---

**An exception: no frame in between has to check or forward anything.**

With `expected`, each of the ten functions must test the result and return
the error upward. Common implementations make a `throw` expensive but the
path where nothing throws free, which suits a rare failure.
