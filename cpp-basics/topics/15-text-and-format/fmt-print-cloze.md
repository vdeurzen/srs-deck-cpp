---
id: fmt-print-cloze
kind: cloze
version: 1
level: 1
tags: [strings, c++23]
requires:
  - fmt-format-not-concat
refs:
  - https://en.cppreference.com/w/cpp/io/print
---

`std::cout << std::format("{} of {}\n", done, total);` first builds a
whole `std::string`, then streams it. In C++23 one call does both, with
no string in between:

```cpp
{{c1::std\::print::a C++23 library function}}("{} of {}\n", done, total);
```
