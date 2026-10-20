---
id: class-static-data-member
kind: trace
version: 2
level: 2
tags: [classes, static-members, tracing]
elaborate: Say aloud where a per-class counter like this would become a data race, and what you would change.
probes:
  1: { "a.number": "1", "Order::issued": "3" }
requires:
  - cpp-essentials/class-member-function-this
  - cpp-essentials/class-init-list-required
refs:
  - https://en.cppreference.com/w/cpp/language/static#Static_data_members
---

```cpp
struct Order {
    inline static int issued = 0;
    int number;
    Order() { ++issued; number = issued; }
};

int main() {
    Order a, b;
    Order c;        // @1
}
```

---

A **`static` data member** belongs to the class, not to any object: there
is one `Order::issued` shared by every `Order`, while each object gets its
own `number`. Each constructor bumps the shared counter, so `a` keeps the
`1` it was given while `Order::issued` reaches 3 after `c`. `inline` lets
it be defined and initialised right in the class. Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
