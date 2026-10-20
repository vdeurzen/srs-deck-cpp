---
id: smart-pointers-shared-ptr-deleter-captured
kind: basic
version: 1
level: 3
tags: [smart-pointers, ownership, destructors]
requires:
  - smart-pointers-shared-ptr-control-block
  - virtual-delete-through-base
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/shared_ptr
  - https://eel.is/c++draft/util.smartptr.shared.const
elaborate: "`std::unique_ptr<Base> q = std::make_unique<Derived>();` has no control block. What happens at its closing brace, and what one-line change to `Base` fixes it?"
---

## `Base` has no virtual destructor (`std::puts(s)` prints `s` and a newline). Which destructors run at the closing brace?

```cpp
struct Base    { ~Base()    { std::puts("~Base"); } };
struct Derived : Base { ~Derived() { std::puts("~Derived"); } };
{
    std::shared_ptr<Base> p = std::make_shared<Derived>();
}
```

---

**`~Derived` then `~Base`: the control block destroys a `Derived`.**
The block records how to destroy the object when the first owner is
built, from the type it was given; converting to `shared_ptr<Base>`
shares that block.
