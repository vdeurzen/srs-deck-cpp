---
id: class-static-data-member
kind: trace
version: 1
level: 2
tags: [classes, static-members, tracing]
probes:
  1: { "a.number": "1", "c.number": "3", "Order::issued": "3" }
requires:
  - class-member-function-this
  - cpp-essentials/class-init-list-required
refs:
  - https://en.cppreference.com/w/cpp/language/static#Static_data_members
---

```cpp
struct Order {
    inline static int issued = 0;
    int number;
    Order() : number(++issued) {}
};

int main() {
    Order a, b;
    Order c;        // @1
}
```

---

A **`static` data member** belongs to the class, not to any object: there
is one `Order::issued` shared by every `Order`, while each object gets its
own `number`. Each constructor bumps the shared counter, so `a`, `b`, `c`
are numbered 1, 2, 3. `inline` lets it be defined and initialised right in
the class. Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
