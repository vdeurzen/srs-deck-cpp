---
id: class-ctor-colon-part
kind: basic
version: 1
level: 1
tags: [classes, constructors, foundations]
requires:
  - class-constructor-intro
elaborate: Say how this compares with filling a Go struct literal inside a `NewCar` function, and what C++ lets you do here that Go does not.
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Member_initializer_list
  - https://eel.is/c++draft/class.base.init
---

```cpp
struct Car {
    int hp;
    int seats;
    Car(int h) : hp(h), seats(4) {}
};
```

## In `Car`'s constructor, what does the part `: hp(h), seats(4)` do?

---

**It is the member initialiser list: it gives `hp` and `seats` their starting values.**

It sits between the constructor's `)` and its body. Each entry names a
member, not its type, and the value it starts from, in parentheses or
braces; commas separate entries. `Car c(90);` starts
with `hp` 90 and `seats` 4.
