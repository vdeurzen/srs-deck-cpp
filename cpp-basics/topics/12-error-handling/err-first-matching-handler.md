---
id: err-first-matching-handler
kind: trace
version: 1
level: 2
tags: [exceptions, inheritance, tracing]
requires:
  - err-own-exception-type
probes:
  1: { got: "net 5s" }
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://eel.is/c++draft/except.handle
---

```cpp
struct NetError : std::runtime_error {
    using std::runtime_error::runtime_error;
};
struct Timeout : NetError {
    using NetError::NetError;
};

std::string got;
try {
    throw Timeout("5s");
} catch (const NetError& e) {
    got = std::string("net ") + e.what();
} catch (const Timeout& e) {
    got = std::string("timeout ") + e.what();
}
std::string shown = got;      // @1
```

---

Handlers are tried **top to bottom, and the first match wins**, not the
best one. A `Timeout` *is a* `NetError`, so the first handler takes it and
the second can never run; `what()` still returns `"5s"` because `e`
refers to the thrown object. Put derived types first. GCC warns:
`exception of type 'Timeout' will be caught by earlier handler`. Values
from running an instrumented copy built with GCC 16.2 (`g++ -std=c++23`).
