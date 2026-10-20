---
id: ub-use-after-free
kind: basic
version: 1
level: 1
tags: [undefined-behaviour, lifetime, pointers]
requires:
  - life-delete-matches-new
  - ptr-dangling-local
elaborate: In Go the garbage collector keeps that `int` alive while `p` points at it. Say what in C++ takes on that job, and where your code relies on it.
refs:
  - https://en.cppreference.com/w/cpp/language/delete
  - https://en.cppreference.com/w/cpp/language/lifetime
---

## `new int(7)` creates an `int` holding 7. What does the last line read?

```cpp
int* p = new int(7);
delete p;
int v = *p;
```

---

**Nothing defined: `delete` ended the object's lifetime, so `p` dangles
and `*p` is undefined behaviour.** `p` still holds the old address, but
that memory may already serve another allocation. It may read 7,
garbage, or crash; passing once proves nothing.
