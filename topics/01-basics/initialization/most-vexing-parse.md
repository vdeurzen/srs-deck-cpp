---
id: initialization-most-vexing-parse
kind: basic
version: 1
level: 2
tags: [initialization]
refs:
  - https://en.cppreference.com/w/cpp/language/direct_initialization
---

## Why does `Widget w(Gadget());` declare a function instead of constructing a `Widget` from a default-constructed `Gadget`?

Because `Gadget()` inside the parentheses is grammatically ambiguous with a
parameter declaration, and C++ resolves the ambiguity in favour of a
declaration — this is the "most vexing parse". `w` becomes a function
named `w` taking one unnamed parameter of type "pointer to function
returning `Gadget`" and returning a `Widget`.

Brace initialization sidesteps it entirely: `Widget w(Gadget{});` and
`Widget w{Gadget{}};` both construct, because a braced-init-list can never
be parsed as a parameter declaration.
