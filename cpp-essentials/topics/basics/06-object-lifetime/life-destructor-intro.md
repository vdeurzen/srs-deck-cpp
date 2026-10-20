---
id: life-destructor-intro
kind: basic
version: 1
level: 1
tags: [lifetime, destructors, classes]
requires:
  - class-constructor-intro
  - life-scope-automatic
elaborate: Say what Go's `defer` and a C++ destructor have in common, and what the destructor does that `defer` cannot.
refs:
  - https://en.cppreference.com/w/cpp/language/destructor
  - https://eel.is/c++draft/class.dtor
---

## `Logger`'s second member takes no arguments and has no return type. When does it run?

```cpp
struct Logger {
    Logger();
    ~Logger();
};
```

---

**Automatically, whenever a `Logger`'s lifetime ends: it is the destructor.**

For a local `Logger log;` that is the closing `}` of its scope, on
every path out. Its name is `~` plus the class name, and ordinary code
never calls it by name.
