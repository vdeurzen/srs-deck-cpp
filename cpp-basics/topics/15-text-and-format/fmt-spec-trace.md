---
id: fmt-spec-trace
kind: trace
version: 1
level: 2
tags: [strings, format, tracing]
requires:
  - fmt-format-not-concat
probes:
  1: { w: "[   42]" }
  2: { t: "[ab   ]" }
  3: { f: "[***42]" }
refs:
  - https://en.cppreference.com/w/cpp/utility/format/spec#Fill_and_align
  - https://en.cppreference.com/w/cpp/utility/format/spec#Width_and_precision
---

```cpp
std::string w = std::format("[{:5}]", 42);      // @1
std::string t = std::format("[{:5}]", "ab");    // @2
std::string f = std::format("[{:*>5}]", 42);    // @3
```

---

After the `:` comes a **format spec** for that one argument. A bare
number is the minimum **width**: the value is padded to 5 characters,
numbers to the right and text to the left by default. Before the width,
`>` (or `<`, `^`) sets the alignment, and the character before *that*
is the **fill**, here `*`. Verified by compiling and running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
