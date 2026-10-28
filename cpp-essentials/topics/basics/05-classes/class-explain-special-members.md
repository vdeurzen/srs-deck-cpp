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
- [ ] Problem: the compiler writes some constructors itself and converts silently; the class author must control which calls compile
- [ ] Mechanism: `= default` asks for the compiler-written version; `= delete` makes every call a compile error
- [ ] Example: deleting the copy constructor makes copying a one-of-a-kind ticket a compile error
- [ ] Trade-off: `explicit` stops silent conversions, at the price of callers naming the type: `Celsius{21.5}`
- [ ] Pitfall: declaring any constructor removes the compiler-written no-argument one until you default it back
