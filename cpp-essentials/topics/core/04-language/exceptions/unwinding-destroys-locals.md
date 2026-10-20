---
id: exceptions-unwinding-destroys-locals
kind: basic
version: 1
level: 1
tags: [exceptions, raii]
requires:
  - err-throw-catch-intro
  - life-locals-reverse-order
elaborate: Say aloud which cleanup in your Go code lives in a `defer`, and what in C++ would run it when an exception passes through.
refs:
  - https://en.cppreference.com/w/cpp/language/throw
  - https://eel.is/c++draft/except.ctor
---

`save()` creates two locals, `Conn c;` then `File f;`; their destructors
close a connection and a file.

## An exception propagates out of `save()`. What happens to `c` and `f`?

---

**Both are destroyed, in reverse order of construction (`f`, then `c`),
as the stack unwinds.**

Every fully constructed automatic object between the `throw` and the
matching `catch` has its destructor run, so the file and the connection
close without any `try`/`catch` in `save()`. Cleanup held in destructors
needs no error-handling code of its own.
