---
id: const-pointer-read-rule
kind: cloze
version: 2
level: 1
tags: [const, pointers]
requires:
  - ptr-holds-an-address
  - const-no-modify
elaborate: Say aloud how you would read `const int* const p` right to left.
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Constness
  - https://eel.is/c++draft/dcl.ptr
---

Read a pointer declaration right to left, starting from the name; each
`const` applies to what is immediately to its left (or, at the far left,
to what follows it). In `const int* p`, the read-only part is
{{c1::the `int` it points to::which object?}}. In
`int* const s`, it is {{c2::the pointer `s` itself::which object?}}.
