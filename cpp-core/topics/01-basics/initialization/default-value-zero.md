---
id: initialization-default-value-zero
kind: basic
version: 1
level: 2
tags: [initialization]
requires:
  - raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://en.cppreference.com/w/cpp/language/value_initialization
---

## Inside a function body in C++23, `int a;` and `int b{};`. What may you read from each before assigning to it?

---

**`b` holds `0`; `a` is indeterminate, and reading it is undefined
behaviour.** `int a;` is *default-initialization*, which for a scalar with
automatic storage does nothing. The empty braces make `b{}`
*value-initialization*, which zero-initializes a scalar. The braces are
the whole difference.
