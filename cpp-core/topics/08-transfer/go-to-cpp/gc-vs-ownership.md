---
id: transfer-gc-vs-ownership
kind: basic
version: 1
level: 2
tags: [transfer, misconception, ownership]
elaborate: Where else does a bare `new` in C++ code signal an owner nobody named, and what would you write there instead?
requires:
  - cpp-essentials/smart-pointers-unique-ptr-ownership
refs:
  - https://en.cppreference.com/w/cpp/language/new
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---

Many expect an object that nothing points to any more to be reclaimed
automatically. `tick` runs once per frame.

```cpp
void tick() {
    Buffer* b = new Buffer{};
    b->fill();
}
```

## What happens to each `Buffer` that `tick` creates?

---

**It leaks: nothing ever frees it, because C++ has no garbage collector.**

`new` hands back an owning raw pointer; only a matching `delete` ends the
object. Name an owner instead: `Buffer b;` on the stack, or
`auto b = std::make_unique<Buffer>();`, whose destructor deletes it.
