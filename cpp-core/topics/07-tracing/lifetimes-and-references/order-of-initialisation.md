---
id: trace-order-of-initialisation
kind: trace
version: 2
level: 3
tags: [tracing, initialization]
probes:
  1: { trail: "acb" }
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
  - https://eel.is/c++draft/class.base.init#15
---

```cpp
std::string trail;
char mark(char c) { trail += c; return c; }
struct S {
  char a;
  char c = mark('c');
  char b;
  S() : b(mark('b')), a(mark('a')) {}
};
S s;   // @1
```

---

Members initialise in **declaration order**: `a`, `c`, `b`. The order the
initialiser list is written in is ignored, and a default member
initialiser (`c`) is not run "before" or "after" the list: it runs in its
declared slot when the constructor does not name that member. So a member
may safely read only members declared above it. Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`, `-Wreorder` warns
under `-Wall`).
