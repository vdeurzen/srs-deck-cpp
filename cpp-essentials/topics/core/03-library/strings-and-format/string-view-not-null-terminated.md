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
  1: { n: "10" }
  2: { c_str: "report.txt.bak" }
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view/data
---

```cpp
std::string_view all = "report.txt.bak";
std::string_view name = all.substr(0, 10);
auto n = name.size();                   // @1
std::string c_str = name.data();         // @2
```

---

`substr` on a view copies nothing: `name` is a pointer into `all` plus a
length of 10. `data()` returns that pointer, and nothing puts a `'\0'` after
the tenth character, so anything that reads until a terminator (here the
`std::string` constructor from `const char*`, in real code `fopen`) runs on
to the end of `all`. A `string_view` is **not** null-terminated; pass
`std::string(name).c_str()` to C APIs. Verified with GCC 16.2
(`g++ -std=c++23`).
