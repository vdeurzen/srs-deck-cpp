---
id: virtual-delete-through-base
kind: basic
version: 1
level: 2
tags: [inheritance, virtual, destructors, new-delete]
requires:
  - virtual-function-intro
  - life-delete-matches-new
  - life-destructor-intro
  - class-default-delete-where
elaborate: Find a base class in code you know that is deleted through a base pointer; does it have a virtual destructor?
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Virtual_destructors
  - https://eel.is/c++draft/expr.delete#3
---

## What does the last line do?

```cpp
struct Plugin {
  virtual void run() {}
};
struct Reverb : public Plugin {
  int* samples = new int[48000];
  ~Reverb() { delete[] samples; }
};

Plugin* p = new Reverb;
delete p;
```

---

**Undefined behaviour: `Plugin` has no virtual destructor.** Deleting
through a base pointer needs one to reach the derived destructor.
Typically only `~Plugin` runs, so `~Reverb` never frees `samples`. Fix:
give the base `virtual ~Plugin() = default;`, as every class meant to be
deleted through a base pointer should have.
