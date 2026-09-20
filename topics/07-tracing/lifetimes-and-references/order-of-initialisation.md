---
id: trace-order-of-initialisation
kind: trace
version: 1
level: 3
tags: [tracing, initialization]
probes:
  1: { a: "2" }
  2: { a: "2", b: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
---

```cpp
struct Point {
  int y = 1;
  int x = y + 1;
};
Point p;
int a = p.x;   // @1
int b = p.y;   // @2
```

---

Members always initialise in **declaration order** — `y` then `x` — never
the order they happen to appear written elsewhere. That is why `x`'s
default member initialiser can safely read `y`: by the time `x`
initialises, `y` (declared first) already holds `1`. Had the declaration
order been reversed (`x` before `y`, with `x`'s initialiser reading `y`),
`x` would read `y` before `y` was initialised — undefined behaviour that
most compilers do not diagnose. Verified against GCC 13.3
(`g++ -std=c++23`).
