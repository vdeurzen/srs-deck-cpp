---
id: ptr-dangling
kind: basic
version: 2
level: 2
tags: [pointers, lifetime]
requires:
  - ptr-dangling-local
  - life-delete-matches-new
  - ub-three-behaviours
elaborate: Go's garbage collector makes this impossible; say aloud which habit (setting the pointer to `nullptr`, or an owner type) you will use instead.
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://timsong-cpp.github.io/cppwp/n4950/basic.stc.general#4
---

```cpp
int* p = new int{5};
delete p;
int a = *p;     // A
int* q = p;     // B
delete p;       // C
```

## In C++23, which of lines A, B and C have undefined behaviour?

---

**A and C: both go through `p` to an object that no longer exists.**

After `delete p;`, `p` is *dangling*: it holds an invalid pointer value.
Reading or deleting through it is undefined. Merely copying the stale
value, as B does, is implementation-defined. Nothing in `p`'s bits
reveals which state it is in.
