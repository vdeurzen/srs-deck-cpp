---
id: class-delete-copy
kind: code
version: 1
level: 2
tags: [classes, special-members, copying]
input: chips
choices:
  c1: ["Ticket(const Ticket&) = delete;", "Ticket(const Ticket&) = default;", "explicit Ticket(const Ticket&);"]
compile:
  harness: |
    static_assert(std::is_constructible_v<Ticket, int>);
    static_assert(!std::is_copy_constructible_v<Ticket>);
    int main() {}
requires:
  - class-default-ctor-restore
refs:
  - https://en.cppreference.com/w/cpp/language/function#Deleted_functions
  - https://en.cppreference.com/w/cpp/language/copy_constructor
---

The **copy constructor** builds a new object from an existing one of the
same type; it runs for `Ticket t2 = t1;` and `Ticket t2(t1);`. Each
`Ticket` stands for one seat. Make every such copy a compile error.

```cpp
#include <type_traits>
class Ticket {
    int seat_;
public:
    constexpr Ticket(int seat) : seat_(seat) {}
    {{c1::Ticket(const Ticket&) = delete;}}
};
```

---

`= delete` declares the copy constructor and makes every call to it a
compile error. `= default` asks for the ordinary memberwise copy.
`explicit` only blocks the `=` form; `Ticket t2(t1);` still compiles.
Assigning to an existing ticket (`t2 = t1;`) is a different function,
the copy assignment `operator=`, so delete that too to forbid it.
