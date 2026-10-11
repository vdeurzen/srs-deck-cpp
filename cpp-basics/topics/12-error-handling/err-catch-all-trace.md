---
id: err-catch-all-trace
kind: trace
version: 1
level: 2
tags: [exceptions, tracing]
requires:
  - err-first-matching-handler
probes:
  1: { seen: "other" }
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://eel.is/c++draft/except.handle
---

```cpp
std::string seen;
try {
    throw 42;
} catch (const std::exception& e) {
    seen = "std";
} catch (...) {
    seen = "other";
}
std::string shown = seen;     // @1
```

---

Any type can be thrown, not only classes derived from `std::exception`.
An `int` matches no `std::exception` handler, so the search moves on to
`catch (...)`, which matches **every** exception. The price: it has no
parameter, so it cannot ask the exception what went wrong. It must come
last; GCC rejects a `catch (...)` followed by other handlers. Values from
running an instrumented copy built with GCC 16.2 (`g++ -std=c++23`).
