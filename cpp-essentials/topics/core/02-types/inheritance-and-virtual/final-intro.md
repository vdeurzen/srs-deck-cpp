---
id: virtual-final-intro
kind: basic
version: 1
level: 2
tags: [inheritance, virtual]
requires:
  - virtual-override-mismatch
elaborate: Say in one sentence, as to an interviewer, what the compiler may do with a virtual call once it knows no class can override the function further.
refs:
  - https://en.cppreference.com/w/cpp/language/final
  - https://eel.is/c++draft/class.pre
---

```cpp
struct Shape { virtual int area() { return 0; } };
struct Circle final : Shape { int area() override { return 3; } };
struct Ring : Circle { int area() override { return 2; } };
```

## One of these three lines does not compile. Which word makes it fail?

---

**`final`, on `Circle`: after a class name it forbids deriving from it, so `Ring` fails.**

`final` is a specifier, written where the class's name is declared. On a
virtual function (`int area() final`) it instead forbids overriding that
function in any further derived class.
