---
id: smart-unique-ptr-intro
kind: basic
version: 1
level: 1
tags: [lifetime, ownership, smart-pointers]
requires:
  - life-stack-vs-heap
  - life-destructor-intro
  - std-names-and-headers
elaborate: Say in one sentence, as to an interviewer, who owns the `int` here and what that ownership obliges.
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique
  - https://eel.is/c++draft/unique.ptr
---

## `std::make_unique<int>(5)` does `new int{5}` and returns the address wrapped in a `std::unique_ptr<int>`. Nothing in `g` calls `delete`. What frees the `int`?

```cpp
#include <memory>

void g() {
    std::unique_ptr<int> p = std::make_unique<int>(5);
    *p += 1;
}
```

---

**`p`'s destructor, at `g`'s closing brace: a `unique_ptr` deletes the object it owns.**

`p` is an ordinary local: it dies at `}`, and its destructor runs
`delete` on the heap `int`. It is used like a pointer (`*p`), but it is
the `int`'s single *owner*, so cleanup follows `p`'s scope on every path
out.
