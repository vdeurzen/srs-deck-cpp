---
id: execution-senders-are-not-futures
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, misconception]
elaborate: Where in your own code does a std::future or a callback chain start work before anyone has said where it should run, or allocate a shared state you never needed? What would owning that storage instead look like?
refs:
  - https://en.cppreference.com/w/cpp/thread/future
  - https://eel.is/c++draft/exec.snd.general
  - https://wg21.link/p2300
requires:
  - execution-sender-is-a-description
---

## "A sender is basically `std::future` with a working `.then()`." What does this miss?

---

**A future is a handle to work already running; a sender is a recipe
not yet started.**

Unstarted work can still be given a scheduler, wrapped, retried or
thrown away; running work can only be waited on. The rest follows: no
shared state to allocate, cancellation has somewhere to go, and the
caller decides where continuations run.
