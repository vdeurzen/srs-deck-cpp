---
id: life-shallow-copy-pointer
kind: basic
version: 1
level: 2
tags: [lifetime, copy, new-delete, special-members]
requires:
  - life-delete-matches-new
  - life-destructor-intro
  - class-ctor-colon-part
  - life-copy-init-not-assign
elaborate: Find a class of yours that holds a raw owning pointer; what does copying it do today?
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor#Implicitly-defined_copy_constructor
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

## This compiles without a warning. What goes wrong when `f` returns?

```cpp
struct IntBuf {
  int* data;
  IntBuf(int n) : data(new int[n]) {}
  ~IntBuf() { delete[] data; }
};
void f() {
  IntBuf a{8};
  IntBuf b = a;
}
```

---

**The array is `delete[]`d twice.** The compiler-written copy
constructor copies each member, so `b.data` holds the same address as
`a.data`: one array, two owners. Both destructors free it, which is
undefined behaviour. A class that owns a resource must define or `= delete`
its copy operations.
