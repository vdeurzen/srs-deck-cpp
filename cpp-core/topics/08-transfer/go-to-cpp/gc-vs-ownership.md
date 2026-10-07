---
id: transfer-gc-vs-ownership
kind: basic
version: 1
level: 2
tags: [transfer, misconception, ownership]
elaborate: Which of your Go functions return a pointer to a freshly allocated struct, and what would the C++ port return instead?
requires:
  - smart-pointers-unique-ptr-ownership
refs:
  - https://en.cppreference.com/w/cpp/language/new
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---

## `tick` is ported line for line from Go's `b := new(Buffer)` and runs once per frame. What happens to each `Buffer` it creates?

```cpp
void tick() {
    Buffer* b = new Buffer{};
    b->fill();
}
```

---

**It leaks: nothing ever frees it, because C++ has no garbage collector.**

`new` hands back an owning raw pointer; only a matching `delete` ends the
object. Name an owner instead: `Buffer b;` on the stack, or
`auto b = std::make_unique<Buffer>();`, whose destructor deletes it.
