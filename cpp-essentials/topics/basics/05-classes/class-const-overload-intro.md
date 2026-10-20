---
id: class-const-overload-intro
kind: basic
version: 1
level: 1
tags: [classes, const, member-functions, overloading]
requires:
  - const-member-on-const-ref
  - fn-overload-ranking
elaborate: Say in one sentence why a container would offer both versions of an element accessor.
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
  - https://eel.is/c++draft/over.ics.rank
---

```cpp
struct Log {
    int peek()       { return 1; }
    int peek() const { return 2; }
};

Log g;
int r = g.peek();
```

## `g` is not `const`, so both overloads of `peek` are callable on it. What is `r`?

---

**1: a non-`const` object picks the non-`const` overload.**

The object the call is made on takes part in overload resolution like a
reference argument. Both bindings of `g` are exact matches; the one that
adds no `const` wins the tie. Through a `const` reference only the
`const` version is callable.
