---
id: virtual-slicing-intro
kind: basic
version: 1
level: 1
tags: [inheritance, slicing]
requires:
  - virtual-is-a
  - fn-param-change-intro
elaborate: Say what a function that takes a base class by value can never see of the object it was passed, and how you would change its signature.
refs:
  - https://en.cppreference.com/w/cpp/language/object#Subobjects
  - https://en.cppreference.com/w/cpp/language/copy_constructor
---

## `keep` takes a `Shape` by value and is passed a `Square`. Which of `q`'s members does the parameter `s` hold?

```cpp
struct Shape { int id = 1; };
struct Square : public Shape { int side = 3; };

void keep(Shape s);

Square q;
keep(q);
```

---

**Only `id`: `s` is a new `Shape`, so `side` is *sliced* off.**

A by-value parameter is a new object of its declared type. `s` is
copied from the `Shape` base subobject of `q`, and a `Shape` has no room
for `side`. `s` is a plain `Shape`, not a `Square` in disguise.
