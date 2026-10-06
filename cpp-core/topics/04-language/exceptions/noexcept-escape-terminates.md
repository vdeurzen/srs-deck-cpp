---
id: exceptions-noexcept-escape-terminates
kind: basic
version: 1
level: 2
tags: [exceptions, noexcept]
requires:
  - exceptions-unwinding-destroys-locals
  - move-semantics-noexcept-move
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://en.cppreference.com/w/cpp/error/terminate
---

## `void flush() noexcept { write_all(); }`: `write_all` throws. What happens?

---

**`std::terminate` is called; no caller's `catch` ever sees the exception.**

`noexcept` is not checked at compile time. It is a promise, and breaking it
ends the program (whether the stack is unwound first is
implementation-defined). In return, callers and containers may rely on the
call never throwing.
