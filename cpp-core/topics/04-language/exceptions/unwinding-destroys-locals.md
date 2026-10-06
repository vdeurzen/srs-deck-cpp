---
id: exceptions-unwinding-destroys-locals
kind: basic
version: 1
level: 1
tags: [exceptions, raii]
refs:
  - https://en.cppreference.com/w/cpp/language/throw
  - https://eel.is/c++draft/except.ctor
---

## An exception propagates out of `save()`, which holds a local `std::ofstream` and a `std::lock_guard`. What happens to those two objects?

---

**Both are destroyed, in reverse order of construction, as the stack unwinds.**

Every fully constructed automatic object between the `throw` and the
matching `catch` has its destructor run, so the file closes and the mutex
unlocks without any `try`/`catch` in `save()`. That is what makes RAII
cleanup exception-safe.
