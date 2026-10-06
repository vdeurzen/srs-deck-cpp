---
id: coroutines-self-destroying-final-suspend
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes]
requires:
  - coroutines-done-and-destroy-preconditions
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/destroy
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---

## `final_suspend()` returns `std::suspend_never`. What happens to every handle to that coroutine once its body finishes?

---

**It dangles: the coroutine runs off the end and destroys its own
frame.** `done()` and `destroy()` through it are then use-after-free.
So a type whose caller reads a result, or owns the frame, returns
`suspend_always` there and destroys the frame itself; self-destruction
is only right for fire-and-forget work that nobody holds a handle to.
