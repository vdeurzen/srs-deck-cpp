---
id: strings-std-string-intro
kind: basic
version: 1
level: 1
tags: [strings, misconception]
requires:
  - string-basics
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string
  - https://en.cppreference.com/w/cpp/string/basic_string/basic_string
elaborate: Say in one sentence where your own code would pass a `std::string` by value, and what that copy costs.
---

```cpp
#include <string>
std::string a = "pan";
std::string b = a;
b += "da";
```

## Many expect `b = a` to leave both names sharing one set of characters. What does `a` hold after the last line?

---

**`"pan"`: copying a `std::string` copies its characters, so `b` is independent.**

A `std::string` never shares its buffer: `b` gets its own copy of the
three characters, and `+=` grows only `b`'s. The price of that independence is
a copy of every character.
