---
id: spaceship-defaulted-which-compile
kind: basic
version: 1
level: 2
tags: [comparisons]
requires:
  - spaceship-basics
  - class-default-delete-where
  - const-member-on-const-ref
  - fn-auto-return-type
elaborate: Say in one sentence which hand-written comparison operators in an older type of yours this one line would replace, and what bug that removes.
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
  - https://eel.is/c++draft/class.compare.default
---

```cpp
struct Version {
    int major, minor;
    auto operator<=>(const Version&) const = default;
};
```

## Of `==`, `!=`, `<`, `<=`, `>`, `>=`, which compile for two `Version`s?

---

**All six: defaulting `<=>` also declares a defaulted `==`.**

The defaulted `<=>` compares `major`, then `minor`; `<`, `<=`, `>` and
`>=` are answered from its result. The implicit `==` compares members
for equality, and `!=` is answered from that. One line replaces six
hand-written operators that could disagree.
