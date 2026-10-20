---
id: const-member-on-const-ref
kind: basic
version: 1
level: 1
tags: [const, classes, member-functions]
requires:
  - const-ref-names-caller
  - class-struct-members
elaborate: Which member functions in your own classes only read, and do they say so with a trailing `const`?
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
  - https://eel.is/c++draft/class.this
---

## Why does `area()` fail to compile here?

```cpp
struct Rect {
    int w, h;
    int size() { return w * h; }
};
int area(const Rect& r) { return r.size(); }
```

---

**`size()` is not marked `const`, so it may not be called through a
`const Rect&`.** The compiler cannot see that `size()` only reads; without
a trailing `const` it assumes it might modify. Write
`int size() const { ... }`: then the body may not change members, and it
is callable on `const` objects.
