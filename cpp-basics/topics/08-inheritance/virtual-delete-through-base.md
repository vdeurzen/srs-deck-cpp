---
id: virtual-delete-through-base
kind: basic
version: 1
level: 2
tags: [inheritance, virtual, destructors, new-delete]
requires:
  - virtual-construct-order
  - virtual-enable-dispatch
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Virtual_destructors
  - https://eel.is/c++draft/expr.delete#3
---

## What does the last line do?

```cpp
struct Plugin {
  virtual void run() {}
};
struct Reverb : Plugin {
  std::vector<float> samples = std::vector<float>(48000);
  void run() override {}
};

Plugin* p = new Reverb;
delete p;
```

---

**Undefined behaviour: `Plugin` has no virtual destructor.** Deleting
through a base pointer needs one to find the derived destructor. Typically
only `~Plugin` runs, so `samples` is never freed. Fix: give the base
`virtual ~Plugin() = default;`, as every class meant to be used through a
base pointer should have.
