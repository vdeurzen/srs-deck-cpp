---
id: class-constructor-intro
kind: basic
version: 1
level: 1
tags: [classes, constructors]
requires:
  - class-struct-members
elaborate: Say how a C++ constructor differs from Go's `NewCar(hp)` convention, and what C++ guarantees that Go does not.
refs:
  - https://en.cppreference.com/w/cpp/language/constructor
---

## Which of these three declarations is `Car`'s constructor?

```cpp
struct Car {
    Car make(int hp);
    Car(int hp);
    int car(int hp);
};
```

---

**`Car(int hp);`: it has the class's exact name and no return type.**

`make` returns a `Car` but is an ordinary function; `car` differs in case.
The constructor runs automatically whenever a `Car` is created
(`Car c(90);` creates one, passing 90 to it) and gives the new object's
members their starting values.
