---
id: smart-pointers-unique-ptr-moved-from-null
kind: basic
version: 2
level: 2
tags: [smart-pointers, move-semantics, misconception]
requires:
  - smart-pointers-unique-ptr-ownership
  - move-semantics-moved-from-state
elaborate: Where in your own code would `a == nullptr` after a move be a useful test, and why can you not rely on a moved-from `std::vector` being empty?
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr/unique_ptr
  - https://eel.is/c++draft/unique.ptr.single.ctor
---

Many expect a moved-from `std::unique_ptr` to be merely "valid but
unspecified", like a moved-from `std::vector`. (`get()` returns the raw
pointer a `unique_ptr` holds.)

```cpp
std::unique_ptr<int> a = std::make_unique<int>(5);
std::unique_ptr<int> b = std::move(a);
int* raw = a.get();
```

## What is `raw`?

---

**`nullptr`: a moved-from `unique_ptr` is guaranteed to own nothing.**

The standard states it as a postcondition of the move. `b` now owns the
`int`; if `a` still held its address, two destructors would delete it. So
`a == nullptr` after a move is a reliable test.
