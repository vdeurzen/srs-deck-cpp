---
id: coroutines-done-and-destroy-preconditions
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes]
requires:
  - coroutines-handle-operations
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/done
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/destroy
---

## `resume()`, `destroy()` and `done()` on a `coroutine_handle` all have preconditions. What are they?

---

**All three need a *suspended* coroutine.** `resume()`: suspended and
not at the final suspend point — resuming a finished coroutine, or a
running one, is undefined. `destroy()`: suspended at any point, the
final one included; runs the destructors of live locals and the
promise, then frees the frame. `done()`: suspended; `true` only at the
final suspend point.
