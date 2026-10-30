---
id: class-explain-special-members
kind: explain
version: 1
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
- [ ] All three let the class author decide which constructions and conversions compile, rather than the compiler
- [ ] `= default` asks for the version the compiler would write
- [ ] `= delete` makes every call a compile error, so copying a one-of-a-kind ticket fails to build
- [ ] `explicit` stops silent conversions, at the price of callers naming the type: `Celsius{21.5}`
- [ ] Declaring any constructor removes the compiler-written no-argument one until you default it back
