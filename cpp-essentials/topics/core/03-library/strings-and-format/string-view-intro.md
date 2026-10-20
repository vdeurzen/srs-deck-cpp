---
id: strings-string-view-intro
kind: basic
version: 1
level: 1
tags: [strings, string-view]
requires:
  - string-basics
  - ptr-holds-an-address
elaborate: Say, as to a reviewer, what must stay alive for as long as a `std::string_view` is in use.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
  - https://eel.is/c++draft/string.view.template.general
---

`std::string_view` is from the header `<string_view>`.

```cpp
std::string path = "report.txt";
std::string_view v = path;
```

## A `string_view` stores two things, which `v.data()` and `v.size()` return. What are they here?

---

**A pointer to `path`'s own first character, and the length 10.**

The view copies no characters and owns none: it reads `path`'s, so `path`
must outlive `v`. Copying a view copies just the pointer and the length.
