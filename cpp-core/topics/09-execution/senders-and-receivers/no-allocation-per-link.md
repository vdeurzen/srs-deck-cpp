---
id: execution-no-allocation-per-link
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, lifetimes]
refs:
  - https://eel.is/c++draft/exec.connect
  - https://en.cppreference.com/w/cpp/thread/future
requires:
  - execution-connect-and-start
  - execution-senders-are-not-futures
---

## A chain of ten `future.then()` links allocates ten shared states. Why can a ten-adaptor sender chain allocate none?

---

**The caller owns the one operation state, so nobody has to guess where
a result will live.**

A future's producer and consumer own nothing of each other, so the
result needs a reference-counted heap slot. `connect` instead nests
every link inside one object the caller places: a stack frame, a
member, a parent's operation state.
