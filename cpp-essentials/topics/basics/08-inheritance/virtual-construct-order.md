---
id: virtual-construct-order
kind: trace
version: 1
level: 1
tags: [inheritance, constructors, destructors, tracing]
requires:
  - virtual-is-a
  - life-reverse-order-trace
probes:
  1: { seq: "VC" }
  2: { seq: "VC~C~V" }
elaborate: Say why a base class constructor cannot safely call into the derived part of the object.
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Explanation
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
---

```cpp
std::string seq;   // constructors append a letter; destructors '~' then the letter
struct Vehicle {
  Vehicle()  { seq += 'V'; }
  ~Vehicle() { seq += "~V"; }
};
struct Car : public Vehicle {
  Car()  { seq += 'C'; }
  ~Car() { seq += "~C"; }
};

int main() {
  {
    Car car;   // @1
  }            // @2 (just after this brace)
}
```

---

A `Car` contains a `Vehicle` subobject, and the `Car` constructor's body
may use it, so the **base is constructed first**, then the derived body
runs. Destruction is the reverse: `~Car`'s body runs while the `Vehicle`
part still exists, and the base is destroyed last. Verified by compiling
and running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
