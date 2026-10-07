---
id: smart-pointers-two-control-blocks
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-control-block
  - raii-copy-double-close
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/shared_ptr
---

## What goes wrong here?

```cpp
Node* raw = new Node;
std::shared_ptr<Node> a(raw);
std::shared_ptr<Node> b(raw);
```

---

**Two control blocks, each with a strong count of one: `Node` is deleted
twice.** `b` is not a copy of `a`; it is a second, independent owner that
knows nothing of the first. Copy an existing `shared_ptr` (`auto b = a;`)
and the count becomes two. Better, never hold the raw pointer:
`std::make_shared<Node>()` leaves nothing to re-wrap.
