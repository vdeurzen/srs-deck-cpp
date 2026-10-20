---
id: life-delete-ends-heap-object
kind: basic
version: 1
level: 1
tags: [lifetime, new-delete, foundations]
requires:
  - life-stack-vs-heap
elaborate: Say in one sentence why writing `p = nullptr;` instead of `delete p;` would free nothing.
refs:
  - https://en.cppreference.com/w/cpp/language/delete
  - https://eel.is/c++draft/expr.delete
---

## Line C runs. What does it destroy: the pointer `p`, the `int` that `p` points to, or both?

```cpp
void f() {
    int* p = new int{2};
    *p += 1;
    delete p;   // C
}
```

---

**Only the `int`: `delete p;` destroys the object at `p`'s address.**

It ends that object's lifetime and frees its memory. `p` is an
ordinary local: it lives on to `f`'s `}`, still holding the old address,
which now points at nothing alive. Each `new` needs exactly one `delete`;
without it the `int` leaks.
