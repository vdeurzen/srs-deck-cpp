---
id: strings-string-view-not-null-terminated
kind: trace
version: 1
level: 2
tags: [strings, string-view, misconception]
elaborate: Which C APIs in your code (`fopen`, `strtol`, `getenv`) receive `view.data()`? What would make each call safe?
requires:
  - strings-string-view-parameter
probes:
  1: { same: "true" }
  2: { c_str: "report.txt.bak" }
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view/data
---

Many expect `name.data()` below to be a C string holding just
`report.txt`. (`substr(i, n)` gives the n characters starting at i;
`data()` is a pointer to the first one.) Predict each probe.

```cpp
std::string_view all = "report.txt.bak";
std::string_view name = all.substr(0, 10);
bool same = name.data() == all.data();  // @1
std::string c_str = name.data();         // @2
```

---

**A view's `data()` is not null-terminated: `c_str` reads on to `all`'s end.**

`substr` on a view copies nothing: `name` is a pointer into `all` plus a
length of 10, so @1 is `true`. Code that reads to a `'\0'` (this
`std::string` constructor, C library calls) ignores that length. Verified with GCC 16.2
(`g++ -std=c++23`).
