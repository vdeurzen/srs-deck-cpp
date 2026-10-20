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
  - https://eel.is/c++draft/class.base.init#13
requires:
  - class-init-list-which-first
  - class-default-member-init-intro
  - string-basics
elaborate: Find a constructor of yours whose initialiser list uses one member to compute another; is the one it reads declared above it?
---

Each `Tag`'s constructor appends its letter to `trail`.

```cpp
std::string trail;
struct Tag {
  Tag(char ch) { trail += ch; }
};
struct S {
  Tag a;
  Tag c{'c'};
  Tag b;
  S() : b('b'), a('a') {}
};
S s;   // @1
```

---

Members initialise in **declaration order**: `a`, `c`, `b`. The order the
initialiser list is written in is ignored, and a default member
initialiser (`c`) is not run "before" or "after" the list: it runs in its
declared slot when the constructor does not name that member. GCC's
`-Wreorder` (in `-Wall`) warns about this list. Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
