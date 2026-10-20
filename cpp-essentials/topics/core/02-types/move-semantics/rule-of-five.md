---
id: move-semantics-rule-of-five
kind: basic
version: 1
level: 2
tags: [move-semantics, special-members]
requires:
  - life-shallow-copy-pointer
  - move-vs-copy-intro
elaborate: Which of your own classes declares a destructor, and what member type would let it declare none of the five?
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

`std::copy(o.p, o.p + n, p)` copies the `n` ints starting at `o.p` into `p`.

## `Buffer` writes a deep-copying copy constructor and a `delete[]` destructor, nothing else. What does `b = a;` do?

```cpp
struct Buffer {
    int* p; int n;
    Buffer(int k) : p(new int[k]{}), n(k) {}
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
no move is declared at all, so moving a `Buffer` falls back to the
copies, including the broken one.
