---
id: execution-operation-state-lifetime
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, lifetimes]
refs:
  - https://eel.is/c++draft/exec.opstate.general
  - https://wg21.link/p2300
requires:
  - execution-connect-and-start
---

## Why is copying or moving the operation state of a library-provided sender ill-formed?

---

**The running operation holds pointers into it.**

A kernel may hold the address of a buffer inside it; a child's receiver
points back at its parent; a stop callback holds its address. A move
would leave all of those behind. (The `operation_state` concept itself
requires only `start` and destruction.)
