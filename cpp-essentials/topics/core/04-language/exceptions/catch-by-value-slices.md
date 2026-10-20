---
id: exceptions-catch-by-value-slices
kind: trace
version: 2
level: 2
tags: [exceptions, misconception, tracing]
elaborate: Your codebase throws its own exception hierarchy. What else, besides the message, would a by-value `catch` of the base class lose?
requires:
  - err-catch-by-reference-why
probes:
  1: { kept: "false" }
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://en.cppreference.com/w/cpp/error/exception/what
---

Many expect a `catch` of the base class by value to keep the thrown
message, since the handler does match.

```cpp
std::string got;
try { throw std::runtime_error("disk full"); }
catch (std::exception e) { got = e.what(); }
bool kept = got == "disk full";   // @1
```

---

Catching by value copy-initialises a `std::exception` from the
`runtime_error`: the object is **sliced**, and `what()` dispatches to the
base version, whose text is implementation-defined and never the message
(libstdc++ returns `"std::exception"`). Catch by `const&` to bind the
thrown object itself. Values verified with GCC 16.2.
