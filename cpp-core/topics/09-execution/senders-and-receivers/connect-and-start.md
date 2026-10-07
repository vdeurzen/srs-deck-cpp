---
id: execution-connect-and-start
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.connect
  - https://eel.is/c++draft/exec.opstate
  - https://wg21.link/p2300
requires:
  - execution-three-channels
---

## In `std::execution`, what does `connect(sndr, rcvr)` produce?

---

**An *operation state*: one object holding everything the work needs
for its whole lifetime.**

The operation states of a composed sender's children are stored
*inside* it, nested, so a whole pipeline is one object whose size is
known at compile time. Nothing runs yet: that is what `start(op)` is
for.
