---
id: life-shared-ptr-last-owner
kind: basic
version: 1
level: 1
tags: [lifetime, ownership]
requires:
  - cpp-essentials/life-unique-ptr-owns-trace
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
---

## `a`, `b` and `c` are copies of one `std::shared_ptr<Song>`. When `a` and `b` are destroyed, what happens to the `Song`?

```cpp
std::shared_ptr<Song> a = std::make_shared<Song>();
std::shared_ptr<Song> b = a;
std::shared_ptr<Song> c = a;
```

---

**Nothing yet: `c` still owns it.** Every copy of a `shared_ptr` is
another *owner* of the same `Song`, and the owners share a count.
Destroying an owner lowers the count; only the last one to go deletes
the `Song`. `make_shared` creates the `Song` and its first owner in
one call.
