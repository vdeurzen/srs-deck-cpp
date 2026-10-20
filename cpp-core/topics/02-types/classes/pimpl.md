---
id: class-pimpl
kind: basic
version: 1
level: 3
tags: [classes, idioms, compile-time]
requires:
  - cpp-essentials/linkage-translation-unit
  - class-invariant-constructor
refs:
  - https://en.cppreference.com/w/cpp/language/pimpl
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
elaborate: Which header in your codebase triggers the most rebuilds when it changes? Would hiding its private members behind a pointer be worth one allocation per object?
---

## `Widget` keeps its members behind a pointer (PIMPL). What does it trade?

```cpp
// widget.h
class Widget {
    struct Impl;                 // declared, not defined
    std::unique_ptr<Impl> p_;
public:
    Widget();
    ~Widget();
};
```

---

**Buys: private changes don't touch the header. Costs: a heap allocation and an indirection.**

```cpp
// widget.cpp
struct Widget::Impl { std::string name; std::vector<int> data; };
Widget::Widget() : p_(std::make_unique<Impl>()) {}
Widget::~Widget() = default;     // here, where Impl is complete
```

Editing `Impl` recompiles one file and keeps `sizeof(Widget)` and the ABI
stable. Every object pays an allocation, every member access a pointer
hop. `~Widget` is defined in the .cpp because `unique_ptr`'s deleter
needs `Impl` complete.
