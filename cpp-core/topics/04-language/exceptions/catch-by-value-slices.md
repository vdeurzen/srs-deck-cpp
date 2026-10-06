---
id: exceptions-catch-by-value-slices
kind: trace
version: 1
level: 2
tags: [exceptions, misconception, tracing]
elaborate: Your codebase throws its own exception hierarchy. What else, besides the message, would a by-value `catch` of the base class lose?
requires:
  - virtual-slicing
probes:
  1: { value_kept: "false" }
  2: { ref_kept: "true" }
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://en.cppreference.com/w/cpp/error/exception/what
---

```cpp
std::string by_value, by_ref;
try { throw std::runtime_error("disk full"); }
catch (std::exception e) { by_value = e.what(); }
try { throw std::runtime_error("disk full"); }
catch (const std::exception& e) { by_ref = e.what(); }
bool value_kept = by_value == "disk full";   // @1
bool ref_kept = by_ref == "disk full";       // @2
```

---

Catching by value copy-initialises a `std::exception` from the
`runtime_error`: the object is **sliced**, and `what()` dispatches to the
base version, whose text is implementation-defined and never the message
(libstdc++ returns `"std::exception"`). Catching by `const&` binds to the thrown object itself,
so the override runs. Rule: throw by value, catch by `const&`. Verified
with GCC 16.2 (`g++ -std=c++23`).
