---
id: class-init-list-vs-body
kind: trace
version: 2
level: 2
tags: [classes, constructors, initialization, tracing, misconception]
probes:
  1: { built: "2" }
  2: { built: "3" }
requires:
  - class-ctor-colon-part
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Member_initializer_list
elaborate: Find a constructor in your code that assigns its members in the body. Which of those members are built twice, and does it matter for their types?
---

Many expect assigning a member in the constructor body to initialise it,
just as the initialiser list does. `built` counts every `Name` constructed.

```cpp
int built = 0;
struct Name {
    Name()    { ++built; }
    Name(int) { ++built; }
};
struct InBody { Name n; InBody() { n = Name(7); } };
struct InList { Name n; InList() : n(7) {} };

int main() {
    InBody a;       // @1
    InList b;       // @2
}
```

---

**Every member is constructed before the body runs, so the body's
assignment is a second step.** With no list entry, `InBody`'s `n` is
built by `Name()` (1), then the body builds a nameless `Name(7)` (2) and
assigns it. `InList` builds `n` once, from 7 (3). Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
