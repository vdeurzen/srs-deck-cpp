---
id: move-semantics-rule-of-five
kind: basic
version: 1
level: 2
tags: [move-semantics, special-members]
requires:
  - raii-copy-double-close
  - raii-move-steals-handle
elaborate: Which of your own classes declares a destructor, and what member type would let it declare none of the five?
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

## `Buffer` writes a deep-copying copy constructor and a `delete[]` destructor, nothing else. What does `b = a;` do?

```cpp
struct Buffer {
    int* p; std::size_t n;
    explicit Buffer(std::size_t k) : p(new int[k]{}), n(k) {}
    Buffer(const Buffer& o) : p(new int[o.n]), n(o.n) { std::copy(o.p, o.p + n, p); }
    ~Buffer() { delete[] p; }
};
Buffer a(4), b(8);
b = a;
```

---

**The implicit copy assignment copies the pointer: `b`'s array leaks, and
both destructors `delete[]` `a`'s array (double free).**

Rule of Five: a destructor that releases a resource means copy
assignment and both move operations must be written or deleted too. Here
the moves are not declared at all, so a `std::move` falls back to the
copies, including the broken one.
