---
id: strings-sticky-manipulators
kind: trace
version: 1
level: 2
tags: [strings, format, misconception]
elaborate: Where in code you've read does a `std::hex`, `std::setprecision` or `std::boolalpha` set for one value affect output written much later?
requires:
  - strings-format-placeholders
probes:
  1: { b: "ff 10" }
  2: { c: "ff 16" }
refs:
  - https://en.cppreference.com/w/cpp/io/manip/hex
  - https://en.cppreference.com/w/cpp/utility/format/spec
---

```cpp
std::ostringstream os;
os << std::hex << 255;
os << ' ' << 16;
std::string b = os.str();                          // @1
std::string c = std::format("{:x} {}", 255, 16);   // @2
```

---

`std::hex` is not a property of the next value: it sets the stream's
`basefield` flag, which **stays set** until something changes it, so the
later `16` also prints in hex as `10`. A `std::format` spec such as `{:x}`
applies to its own argument only; the next `{}` is decimal again. Verified
with GCC 16.2 (`g++ -std=c++23`).
