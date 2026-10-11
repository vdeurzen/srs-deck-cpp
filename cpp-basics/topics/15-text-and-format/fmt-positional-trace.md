---
id: fmt-positional-trace
kind: trace
version: 1
level: 1
tags: [strings, format, tracing]
requires:
  - fmt-format-not-concat
probes:
  1: { a: "7/9" }
  2: { b: "9/7" }
  3: { c: "x-x" }
refs:
  - https://en.cppreference.com/w/cpp/utility/format/format
  - https://eel.is/c++draft/format.string.general
---

```cpp
std::string a = std::format("{}/{}", 7, 9);          // @1
std::string b = std::format("{1}/{0}", 7, 9);        // @2
std::string c = std::format("{0}{1}{0}", 'x', '-');  // @3
```

---

Bare `{}` take the arguments in order. A number inside the braces picks
an argument by **position, counting from 0**: `{1}` is the second
argument, so `b` swaps the two without reordering the call. A position
may be used more than once, which is how `c` repeats `'x'` while passing
it only once. One string uses either bare or numbered braces, never
both. Verified by compiling and running an instrumented copy under GCC
16.2 (`g++ -std=c++23`).
