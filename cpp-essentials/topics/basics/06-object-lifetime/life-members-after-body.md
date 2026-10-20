---
id: life-members-after-body
kind: basic
version: 1
level: 2
tags: [lifetime, destructors, members]
requires:
  - life-locals-reverse-order
elaborate: Say what a destructor body could no longer do safely if the members were destroyed before it ran.
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://eel.is/c++draft/class.dtor#13
---

## A `Car` is destroyed. Which runs first: the body of `~Car`, or the destructor of its member `e`?

```cpp
struct Engine { ~Engine(); };
struct Car {
  Engine e;
  ~Car();
};
```

---

**The body of `~Car`; the members are destroyed after it.**

The body may still need `e` for its cleanup, so `e` stays intact until
the body finishes; only then are the members destroyed. It is
construction run backwards: members first, then the body.
