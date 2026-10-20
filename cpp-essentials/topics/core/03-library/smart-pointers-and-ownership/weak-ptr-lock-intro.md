---
id: smart-pointers-weak-ptr-lock-intro
kind: basic
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-weak-ptr-breaks-cycles
elaborate: Say, as to an interviewer, why `lock()` hands back an owner rather than a plain pointer.
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/lock
  - https://eel.is/c++draft/util.smartptr.weak.obs
---

`w` is a `std::weak_ptr<Node>`; the `Node` it observes may or may not have
been destroyed already.

```cpp
std::shared_ptr<Node> p = w.lock();
```

## What does `p` hold?

---

**An owner of the `Node` if it still exists, else an empty `shared_ptr`.**

`lock()` tests and acquires in one step: a live `Node` gains an owner, so
it cannot be destroyed while `p` exists. A `weak_ptr` itself gives no
access to the object; `lock()` is the way in.
