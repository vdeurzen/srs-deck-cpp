---
id: templates-lazy-member-instantiation
kind: basic
version: 1
level: 3
tags: [templates]
requires:
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/class_template#Implicit_instantiation
  - https://eel.is/c++draft/temp.inst
---

## `Point` has no `operator<<`, yet this compiles. Which call on `b` would make it stop compiling?

```cpp
template<class T>
struct Box {
    T value;
    void print() const { std::cout << value; }
};
struct Point { int x, y; };
Box<Point> b{{1, 2}};
```

---

**`b.print()`: a class template's member function bodies are instantiated
only when used.**

Implicitly instantiating `Box<Point>` instantiates member *declarations*,
not definitions, so a `std::map` of non-default-constructible values
works until you call `operator[]`. An explicit `template struct
Box<Point>;` instantiates every member, and so would fail.
