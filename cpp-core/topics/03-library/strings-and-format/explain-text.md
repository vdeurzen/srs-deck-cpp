---
id: strings-explain-text
kind: explain
version: 1
level: 3
tags: [strings, format]
requires:
  - strings-string-view-dangling
  - strings-sso
  - strings-sticky-manipulators
refs:
  - https://en.cppreference.com/w/cpp/string
  - https://en.cppreference.com/w/cpp/utility/format
---
Explain how you handle text in C++23: which type owns it, which one passes
it, and how you build it.
---
- [ ] Owns text in `std::string`; short contents stay in the object's small-string buffer, longer ones are allocated
- [ ] Passes read-only text as `std::string_view`, which binds to literals and strings without a copy
- [ ] Never returns or stores a `string_view` into a local or temporary `string`: the view dangles when its owner dies
- [ ] Builds text with `std::format`/`std::print`, whose format string is checked against the argument types at compile time
- [ ] Prefers format specs to iostream manipulators, which stay set on the stream and leak into later output
