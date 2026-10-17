---
id: class-const-object-call
kind: trace
version: 1
level: 2
tags: [classes, const, member-functions, overloading, tracing]
probes:
  1: { seen: "w" }
  2: { seen: "wr" }
requires:
  - const-member-on-const-ref
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
---

```cpp
#include <string>
std::string seen;

struct Doc {
    void view()       { seen += 'w'; }
    void view() const { seen += 'r'; }
};

int main() {
    Doc d;
    const Doc& cd = d;
    d.view();         // @1
    cd.view();        // @2
}
```

---

A `const` and a non-`const` member function with the same name are two
**overloads**; the choice depends on the constness of the expression the
call is made through. `d` is non-`const`, so it gets the non-`const`
`view()`. `cd` names the very same object, but through a `const` reference,
so it gets the `const` one. This is how `std::vector::operator[]` returns a
writable or a read-only element. Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23`).
