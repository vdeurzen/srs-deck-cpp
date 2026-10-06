---
id: strings-format-placeholders
kind: basic
version: 1
level: 1
tags: [strings, format]
refs:
  - https://en.cppreference.com/w/cpp/utility/format/format
  - https://en.cppreference.com/w/cpp/utility/format/spec
---

## What does `std::format("{} = {:x}", "mask", 255)` return?

---

**`"mask = ff"`.**

Each `{}` takes the next argument in its default form. Text after a colon
is a format spec for that one argument only: `x` asks for lowercase hex.
