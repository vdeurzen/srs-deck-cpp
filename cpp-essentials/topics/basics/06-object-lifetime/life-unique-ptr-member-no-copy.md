---
id: life-unique-ptr-member-no-copy
kind: basic
version: 1
level: 2
tags: [lifetime, smart-pointers, ownership, special-members]
requires:
  - life-make-unique
  - life-shallow-copy-pointer
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor#Deleted_copy_constructor
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---

## `Car` declares no copy constructor and no destructor. What happens at `Car b = a;`?

```cpp
struct Engine { int hp = 90; };
struct Car {
  std::unique_ptr<Engine> engine = std::make_unique<Engine>();
};
void f() {
  Car a;
  Car b = a;
}
```

---

**It does not compile: `Car`'s copy constructor is deleted.** The
generated one would copy each member, and a `unique_ptr` cannot be
copied: that would make two owners of one `Engine`, each deleting it.
With a raw `Engine*` member the same line compiles and the `Engine` is
deleted twice. The ownership bug became a build error.
