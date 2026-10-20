---
id: life-ctor-dtor-count
kind: trace
version: 2
level: 1
tags: [lifetime, scope, constructors, destructors, tracing]
requires:
  - life-scope-exit-worked
probes:
  1: { alive: "2" }
  2: { alive: "1" }
  3: { alive: "1" }
elaborate: Say where in a loop of your own a local object is created and destroyed on every iteration, and whether that matters.
refs:
  - https://en.cppreference.com/w/cpp/language/destructor
  - https://en.cppreference.com/w/cpp/language/storage_duration
---

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Cell {
  Cell()  { ++alive; }
  ~Cell() { --alive; }
};

int main() {
  Cell a;
  {
    Cell b;        // @1
  }                // @2 (just after this brace)
  for (int i = 0; i < 2; ++i) {
    Cell d;
  }                // @3 (just after the loop)
}
```

---

The constructor runs where an object is declared; the destructor runs
when control leaves that object's block. At Probe 1, `a` and `b` both
exist. The inner `}` destroys `b`, so `alive` drops back to 1. The loop
body is a block too: each iteration constructs a fresh `d` and destroys
it at the body's `}`, so none survive. `a` lives until `main` returns.
Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
