---
id: virtual-dispatch-which-runs
kind: trace
version: 1
level: 1
tags: [inheritance, virtual, dispatch, tracing]
requires:
  - virtual-function-intro
elaborate: Say which of your own member functions are meant to be replaced by derived classes, and whether they are `virtual`.
probes:
  1: { u: "0" }
  2: { r: "21" }
  3: { v: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct Sensor {
  int unit() { return 0; }
  virtual int read() { return 0; }
};
struct Thermo : public Sensor {
  int unit() { return 1; }
  int read() { return 21; }
};

int main() {
  Thermo t;
  Sensor& s = t;
  int u = s.unit();   // @1
  int r = s.read();   // @2
  int v = t.unit();   // @3
}
```

---

`s` refers to a `Thermo`, but its declared (*static*) type is `Sensor`. A
non-virtual call is chosen at compile time from the static type, so
`s.unit()` runs `Sensor::unit`. A `virtual` call is chosen at run time from
the object's actual (*dynamic*) type, so `s.read()` runs `Thermo::read`.
Called on `t` directly, the static type is `Thermo`, so `Thermo::unit`
runs. Verified by compiling and running an instrumented copy under GCC
16.2 (`g++ -std=c++23`).
