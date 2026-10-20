---
id: class-const-object-call
kind: trace
version: 2
level: 2
tags: [classes, const, member-functions, overloading, tracing]
probes:
  1: { x: "1" }
  2: { y: "2" }
requires:
  - const-member-on-const-ref
  - class-const-overload-intro
elaborate: Where would a class of yours want one version of a member function for writers and another for read-only callers?
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
---

```cpp
struct Doc {
    int view()       { return 1; }
    int view() const { return 2; }
};

int main() {
    Doc d;
    const Doc& cd = d;
    int x = d.view();     // @1
    int y = cd.view();    // @2
}
```

---

A `const` and a non-`const` member function with the same name are two
**overloads**; the choice depends on the constness of the expression the
call is made through. `d` is non-`const`, so it gets the non-`const`
`view()`. `cd` names the very same object, but through a `const` reference,
so only the `const` one is callable. Verified by running an instrumented
copy under GCC 16.2 (`g++ -std=c++23`).
