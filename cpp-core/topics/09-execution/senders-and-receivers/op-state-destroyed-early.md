---
id: execution-op-state-destroyed-early
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, lifetimes]
refs:
  - https://eel.is/c++draft/exec.opstate.general
  - https://eel.is/c++draft/exec.async.ops
requires:
  - execution-operation-state-lifetime
---

## An operation state is destroyed after `start(op)` but before its receiver has been completed. What is that?

---

**A use-after-free: it must live from `start` until a completion
function has been invoked.**

The work still writes into it and completes through it, like freeing
a buffer the kernel is still reading into. The
rule to carry: the operation state is the async stack frame — same
nesting, same ownership, just on no single thread.
