---
id: class-member-init-order
kind: trace
version: 1
level: 2
tags: [classes, tracing, lifetime, misconception]
elaborate: Find a constructor in your code whose initialiser list reads one member to initialise another. Does the declaration order make that read safe?
probes:
  1: { log: "WE" }
  2: { log: "WEew" }
requires:
  - trace-order-of-initialisation
refs:
  - https://eel.is/c++draft/class.base.init#15
  - https://en.cppreference.com/w/cpp/language/constructor#Initialization_order
---

```cpp
std::string log;
struct Part {
    char c;
    Part(char ch) : c(ch) { log += c; }       // 'W' or 'E'
    ~Part() { log += char(c + 32); }          // 'w' or 'e'
};
struct Car {
    Part wheel;
    Part engine;
    Car() : engine('E'), wheel('W') {}   // "engine first, as written"
};
{
    Car car;          // @1
}                     // @2
```

---

The comment's belief is common and wrong. Members are initialised in
**declaration order** (`wheel`, then `engine`), whatever order the
initialiser list names them, and destroyed in reverse. GCC's `-Wreorder`
(in `-Wall`) flags the misleading list. It matters when one member's
initialiser reads another. Verified by running an instrumented copy under
GCC 16.2 (`g++ -std=c++23`); the order is fixed by the standard.
