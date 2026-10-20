---
id: strings-string-view-parameter
kind: basic
version: 1
level: 1
tags: [strings, string-view]
requires:
  - string-literal-is-char-array
  - life-temporary-intro
elaborate: Say when you would still take `const std::string&` rather than `std::string_view`, as to a reviewer.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
---

## `void log_line(const std::string& msg)` is called as `log_line("disk full")`. A `std::string_view` stores only a pointer to the first character and a length, owning nothing. What does declaring the parameter `std::string_view msg` instead save on that call?

---

**Building a temporary `std::string`, which copies every character.**

The literal is a `char` array, so binding it to `const std::string&` builds
a temporary that lives until the call ends. A `string_view` binds to a
literal or a `std::string` without copying: right for read-only parameters
the function doesn't keep.
