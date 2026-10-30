---
id: strings-explain-text
kind: explain
version: 1
level: 3
tags: [strings, format]
requires:
  - cpp-essentials/strings-string-view-dangling
  - cpp-essentials/strings-sso
  - strings-sticky-manipulators
  - strings-format-checked
elaborate: Which function in your own code takes `const std::string&` today, and what would change if it took `std::string_view`?
refs:
  - https://en.cppreference.com/w/cpp/string
  - https://en.cppreference.com/w/cpp/utility/format
---
A colleague asks which types and tools you use for text in C++23, and why.
Explain it to them.
---
- [ ] Owns text in `std::string`; short contents stay in the object's small-string buffer, longer ones are allocated
- [ ] Passes read-only text as `std::string_view`, which binds to literals and strings without a copy
- [ ] Never returns or stores a `string_view` into a local or temporary `string`: the view dangles when its owner dies
- [ ] Builds text with `std::format`, whose format string is checked against the argument types at compile time
- [ ] Prefers format specs to iostream manipulators, which stay set on the stream and leak into later output
