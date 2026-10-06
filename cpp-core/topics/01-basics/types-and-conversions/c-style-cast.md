---
id: types-c-style-cast
kind: basic
version: 1
level: 2
tags: [types, conversions, casts]
requires:
  - types-narrowing-braces
refs:
  - https://en.cppreference.com/w/cpp/language/explicit_cast
  - https://en.cppreference.com/w/cpp/language/static_cast
elaborate: Search your codebase for `(` followed by a type and `*)`; which of those would `static_cast` refuse?
---

## `buf` is a `const char*`. `auto* p = (Packet*)buf;` compiles, but `static_cast<Packet*>(buf)` does not. What did the C-style cast do?

---

**A `reinterpret_cast` plus a `const_cast`: it reinterpreted the bytes and
dropped `const`, silently.** A C-style cast tries the named casts in turn
and takes the first that compiles. `static_cast` allows only checked,
related-type conversions, so it errors here, and a named cast is easy to
grep for.
