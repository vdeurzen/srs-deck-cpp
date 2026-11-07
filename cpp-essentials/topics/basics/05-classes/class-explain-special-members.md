---
id: class-explain-special-members
kind: explain
version: 2
level: 4
tags: [classes, special-members, constructors, interview]
requires:
  - class-default-delete-where
  - class-delete-copy
  - class-explicit-blocks-conversion
  - class-default-ctor-restore
elaborate: Pick one class of yours; which of its constructors would you now default, delete or mark `explicit`?
refs:
  - https://en.cppreference.com/w/cpp/language/function#Deleted_functions
  - https://en.cppreference.com/w/cpp/language/explicit
  - https://en.cppreference.com/w/cpp/language/default_constructor
---
An interviewer points at a class whose constructors carry `= default`,
`= delete` and `explicit`, and asks what each one buys. Explain it to them.
---
- [ ] `= default` brings back a compiler-written constructor, such as the no-argument one, still applying default member initialisers
- [ ] `= delete` makes any use of that function a compile error, so copying a one-of-a-kind ticket fails to build
- [ ] `explicit` stops a one-argument constructor converting silently, so passing a `double` where a `Celsius` is expected fails to compile
