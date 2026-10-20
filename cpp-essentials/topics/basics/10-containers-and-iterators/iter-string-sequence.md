---
id: iter-string-sequence
kind: trace
version: 1
level: 1
tags: [containers, string, tracing]
probes:
  1: { n: "5" }
requires:
  - string-basics
  - vector-basics
  - types-auto-deduces
elaborate: Say when you would append with `push_back` and when with `+=`, and what each takes.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string
  - https://en.cppreference.com/w/cpp/string/basic_string/size
---

```cpp
std::string s = "ab";
s.push_back('c');
s += "de";
auto n = s.size();        // @1
```

---

A `std::string` is a growable sequence of `char`, with the same
`size`/`push_back` vocabulary as `std::vector`. `'c'` is a single `char`
literal, appended by `push_back`; `+=` appends a whole string. `size()`
counts characters, not the hidden terminating `'\0'`, so "abcde" gives 5. Verified with GCC 16.2 (`g++ -std=c++23`).
