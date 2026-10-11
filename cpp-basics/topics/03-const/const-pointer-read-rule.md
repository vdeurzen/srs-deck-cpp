---
id: const-pointer-read-rule
kind: cloze
version: 1
level: 1
tags: [const, pointers]
requires:
  - const-no-modify
  - ptr-holds-an-address
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Constness
  - https://eel.is/c++draft/dcl.ptr
---

Read a pointer declaration right to left, starting from the name; each
`const` applies to what is immediately to its left (or, at the far left,
to what follows it). In `const char* p`, the read-only part is
{{c1::the `char` it points to::pointee or pointer?}}. In
`char* const q`, it is {{c2::`q` itself::pointee or pointer?}}.
