---
id: err-first-matching-handler
kind: trace
version: 2
level: 2
tags: [exceptions, inheritance, tracing]
requires:
  - err-handler-order-warning
probes:
  1: { got: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://eel.is/c++draft/except.handle
elaborate: Say in one sentence, as to an interviewer, how you would order the handlers for three exception types where one derives from another.
---

Any type can be thrown; here two empty structs, one derived from the other.

```cpp
struct NetError {};
struct Timeout : NetError {};

int got = 0;
try {
    throw Timeout{};
} catch (const NetError&) {
    got = 1;
} catch (const Timeout&) {
    got = 2;
}
int shown = got;      // @1
```

---

Handlers are tried **top to bottom, and the first match wins**, not the
best one. A `Timeout` *is a* `NetError`, so the first handler takes it and
the second can never run. Put derived types first. GCC warns:
`exception of type 'Timeout' will be caught by earlier handler`. Values
from running an instrumented copy built with GCC 16.2 (`g++ -std=c++23`).
