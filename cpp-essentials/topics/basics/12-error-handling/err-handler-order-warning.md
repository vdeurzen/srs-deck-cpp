---
id: err-handler-order-warning
kind: basic
version: 1
level: 2
tags: [exceptions, inheritance, compiler-warnings]
requires:
  - err-catch-by-reference-why
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://eel.is/c++draft/except.handle
elaborate: Say how you would order the handlers for `std::exception`, `std::runtime_error` and your own type derived from `std::runtime_error`, and why.
---

Any type can be thrown; here two empty structs, one derived from the other.

```cpp
struct IoError {};
struct DiskFull : IoError {};

try { write_block(); }
catch (const IoError&)  { retry(); }
catch (const DiskFull&) { free_space(); }
```

## GCC warns about the second `catch`. What is wrong with it?

---

**It can never run: handlers are tried top to bottom, and `IoError&` matches first.**

A `DiskFull` *is an* `IoError`, so the first handler already takes every
`DiskFull`. The search stops at the first handler that matches, not the
most specific one. Put derived types first.
