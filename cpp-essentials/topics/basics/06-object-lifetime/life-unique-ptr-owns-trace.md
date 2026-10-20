---
id: life-unique-ptr-owns-trace
kind: trace
version: 1
level: 1
tags: [lifetime, ownership, tracing]
requires:
  - life-new-outlives-scope
  - smart-unique-ptr-intro
elaborate: Say how you would spot, in a code review, a `new` whose result nobody owns.
probes:
  1: { alive: "2" }
  2: { alive: "1" }
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://eel.is/c++draft/unique.ptr.single.dtor
---

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Lamp {
  Lamp()  { ++alive; }
  ~Lamp() { --alive; }
};

int main() {
  {
    Lamp* raw = new Lamp;
    std::unique_ptr<Lamp> owned{new Lamp};   // @1
  }                                          // @2 (just after this brace)
}
```

---

Both `Lamp`s come from `new`, so the `}` cannot destroy them directly.
But `owned` is a local object that **owns** its `Lamp`: its destructor
runs `delete` on the pointer it holds, so leaving the block destroys
that `Lamp`. `raw` is just an address; its `Lamp` is never destroyed
(a leak). Verified by compiling and running an instrumented copy under
GCC 16.2 (`g++ -std=c++23`).
