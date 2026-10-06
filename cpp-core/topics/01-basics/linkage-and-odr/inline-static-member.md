---
id: linkage-inline-static-member
kind: code
version: 1
level: 2
tags: [linkage, inline, classes]
input: chips
choices:
  c1: ["inline", "const", "constexpr"]
compile:
  harness: |
    void raise_limit() { Config::limit = 16; }
    int main() {}
requires:
  - linkage-inline-meaning
refs:
  - https://en.cppreference.com/w/cpp/language/static#Static_data_members
  - https://en.cppreference.com/w/cpp/language/inline
---

This class lives in a header. `limit` must be one modifiable object shared
by every translation unit, initialized right here in the class. Complete
the declaration.

```cpp
struct Config {
  static {{c1::inline}} int limit = 8;
};
```

---

A non-`const` static data member may only be initialized in the class if
it is an **inline variable** (C++17). `inline` makes the in-class
declaration a definition that may appear in every translation unit and
still names one object. Before C++17 you wrote `static int limit;` here
and `int Config::limit = 8;` in exactly one `.cpp`. `const`/`constexpr`
would allow the in-class initializer too, but `raise_limit` could no
longer assign.
