---
id: tmpl-distinct-types
kind: basic
version: 1
level: 2
tags: [templates, class-templates, instantiation]
requires:
  - templates-instantiation
  - tmpl-class-member-type
  - class-struct-members
elaborate: Name another pair of standard types built from one template, such as `std::vector<int>` and `std::vector<long>`, and say why they cannot be swapped.
refs:
  - https://en.cppreference.com/w/cpp/language/class_template
  - https://eel.is/c++draft/temp.type
---

## Why does this call not compile, although an `int` converts to `long`?

```cpp
template <typename T>
struct Box { T value; };

void fill(Box<long> b);

Box<int> small{3};
fill(small);   // error
```

---

**`Box<int>` and `Box<long>` are two unrelated classes.** Each set of
template arguments instantiates a separate type, and nothing converts one
into the other. That `int` converts to `long` says
nothing about classes built from them.
