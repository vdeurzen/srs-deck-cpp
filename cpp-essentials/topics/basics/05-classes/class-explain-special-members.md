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
- [ ] `= default` brings back a compiler-written constructor, such as the no-argument one any other constructor removes
- [ ] That defaulted constructor still applies the default member initialisers, such as `int w = 0`
- [ ] `= delete` makes every call a compile error, so copying a one-of-a-kind ticket fails to build
- [ ] Without `explicit`, a one-argument constructor converts silently: a `double` passed where a `Celsius` is expected builds a temporary
- [ ] `explicit` turns that silent conversion into a compile error, so callers must name the type: `Celsius{21.5}`
