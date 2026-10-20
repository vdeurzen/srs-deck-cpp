---
id: virtual-vptr-intro
kind: basic
version: 1
level: 1
tags: [inheritance, virtual, layout]
requires:
  - virtual-function-intro
elaborate: Say in one sentence, as to an interviewer, what a virtual call costs that a plain call does not.
refs:
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#vtable
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct Animal { virtual int legs() { return 0; } };
struct Bird : public Animal { int legs() { return 2; } };

int count(Animal& a) { return a.legs(); }
```

## `count` is compiled once, yet must run `Bird::legs` when handed a `Bird`. Under GCC, what does every `Bird` object carry that lets the call find it?

---

**A hidden pointer, the vptr, to its class's table of virtual functions.**

That table, the **vtable**, exists once per class and holds the address
of each virtual function the class uses. The call loads the object's
vptr, reads the `legs` slot, and calls that address; the standard
specifies only the behaviour.
