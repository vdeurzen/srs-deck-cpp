---
id: operator-overloading-basics
kind: basic
version: 1
level: 1
tags: [operators, classes]
requires:
  - class-struct-members
refs:
  - https://en.cppreference.com/w/cpp/language/operators
  - https://eel.is/c++draft/over.oper
elaborate: Say in one sentence when defining `+` for one of your own types would mislead a reader.
---

```cpp
struct Cents { int n; };
Cents operator+(Cents a, Cents b) { return Cents{a.n + b.n}; }

Cents price{30}, tax{12};
Cents total = price + tax;
```

## Without line 2, the last line does not compile. With it, what does the compiler turn `price + tax` into?

---

**The call `operator+(price, tax)`.**

When an operand has class type, `a + b` looks for a function named
`operator+`: an ordinary function with a special name. It may instead be a member, `Cents operator+(Cents b)`; then
`price + tax` means `price.operator+(tax)`.
