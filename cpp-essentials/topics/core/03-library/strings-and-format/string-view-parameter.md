---
id: strings-string-view-parameter
kind: basic
version: 1
level: 1
tags: [strings, string-view]
requires:
  - value-categories-temporary-materialization
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
---

## `void log_line(const std::string& msg)` is called as `log_line("disk full")`. What does declaring the parameter `std::string_view msg` instead save on that call?

---

**Building a temporary `std::string`: copying the characters, and allocating
if they're long.**

A `string_view` is only a pointer and a length. It binds to a literal, a
`std::string` or a substring without copying anything, which suits read-only
parameters the function doesn't keep.
