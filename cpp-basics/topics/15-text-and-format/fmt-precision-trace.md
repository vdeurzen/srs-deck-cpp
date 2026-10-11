---
id: fmt-precision-trace
kind: trace
version: 1
level: 2
tags: [strings, format, tracing]
requires:
  - fmt-spec-trace
probes:
  1: { p: "[3.14]" }
  2: { q: "[3.0]" }
  3: { r: "[    3.14]" }
refs:
  - https://en.cppreference.com/w/cpp/utility/format/spec#Width_and_precision
---

```cpp
std::string p = std::format("[{:.2f}]", 3.14159);   // @1
std::string q = std::format("[{:.1f}]", 2.96);      // @2
std::string r = std::format("[{:8.2f}]", 3.14159);  // @3
```

---

In a spec, `.N` after the width is the **precision**; with `f` it is the
number of digits after the decimal point, and the value is rounded, not
cut: 2.96 to one digit is `3.0`, trailing zero kept. Width and precision
combine: `8.2f` formats `3.14`, then pads it to 8 characters, right-
aligned like any number. Verified by compiling and running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
