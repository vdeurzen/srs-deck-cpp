---
id: const-needs-initializer
kind: basic
version: 1
level: 1
tags: [const, initialization]
requires:
  - const-no-modify
elaborate: Say how Go's `const` differs from a C++ `const` variable initialised from a function call.
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://eel.is/c++draft/dcl.init.general#8
---

## Inside a function, why does `const double rate;` fail to compile?

---

**A `const` object can never be assigned, so it must get its value where
it is declared.** Without an initializer `rate` would never get a usable value,
so the compiler rejects it. Write
`const double rate = 0.21;`; any later `rate = ...;` is then an error.
