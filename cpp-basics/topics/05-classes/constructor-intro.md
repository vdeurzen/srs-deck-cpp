---
id: class-constructor-intro
kind: basic
version: 1
level: 1
tags: [classes, constructors]
refs:
  - https://en.cppreference.com/w/cpp/language/constructor
---

## Inside a class definition, what two features of a member function's declaration make it a constructor?

---

**It has the class's own name and no return type.**

In `class Car`, `Car(int hp);` is one. It runs automatically whenever a
`Car` is created, with the arguments given there (`Car c(90);`), and
its job is to give the new object's members their starting values. You never call it by name on an
existing object.
