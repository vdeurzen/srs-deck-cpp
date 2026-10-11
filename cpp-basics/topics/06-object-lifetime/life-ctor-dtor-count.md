---
id: life-ctor-dtor-count
kind: trace
version: 1
level: 1
tags: [lifetime, scope, constructors, destructors, tracing]
requires:
  - life-scope-automatic
probes:
  1: { alive: "3", built: "3" }
  2: { alive: "1", built: "3" }
  3: { alive: "1", built: "5" }
refs:
  - https://en.cppreference.com/w/cpp/language/destructor
  - https://en.cppreference.com/w/cpp/language/storage_duration
---

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
int built = 0;   // the constructor adds 1; nothing ever subtracts
struct Cell {
  Cell()  { ++alive; ++built; }
  ~Cell() { --alive; }
};

int main() {
  Cell a;
  {
    Cell b;
    Cell c;        // @1
  }                // @2 (just after this brace)
  for (int i = 0; i < 2; ++i) {
    Cell d;
  }                // @3 (just after the loop)
}
```

---

The constructor runs where an object is declared; the destructor runs
when control leaves that object's block. At Probe 1, `a`, `b` and `c` all
exist. The inner `}` destroys `b` and `c`, so `alive` drops back to 1 while
`built` stays 3: being destroyed does not undo having been constructed.
The loop body is a block too: each iteration constructs a fresh `d` and
destroys it at the body's `}`, so two more are built and none survive.
`a` lives until `main` returns. Verified by compiling and running an
instrumented copy (a `printf` at each probe) under GCC 16.2
(`g++ -std=c++23`).
