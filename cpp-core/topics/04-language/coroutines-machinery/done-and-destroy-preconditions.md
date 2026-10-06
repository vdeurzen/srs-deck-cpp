---
id: coroutines-done-and-destroy-preconditions
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes]
requires:
  - coroutines-handle-operations
  - coroutines-return-object-timing
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/done
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/destroy
---

## `resume()`, `destroy()` and `done()` all have preconditions. What are they, and what does `final_suspend()` returning `std::suspend_never` do to them?

---

All three require the handle to refer to a **suspended** coroutine:

- `resume()` — suspended and *not* finished. Resuming a coroutine that
  is already suspended at its final suspend point is undefined, and so
  is resuming one that is currently running (a coroutine cannot resume
  itself from inside its own body).
- `destroy()` — suspended, at any suspension point including the final
  one. It runs the destructors of the in-scope locals and the promise,
  then frees the frame.
- `done()` — suspended. It answers "is this suspension the *final*
  one?", so it is `false` at an ordinary `co_await` and `true` only at
  the end.

Returning `std::suspend_never` from `final_suspend()` breaks all of
this, because the coroutine then runs off the end without suspending and
**destroys its own frame**. Every handle to it dangles from that moment,
so `done()` and `destroy()` on it are use-after-free — which is why a
type whose caller reads a result, or whose caller owns the frame,
returns `suspend_always` there and destroys the frame itself. Self-
destroying at `final_suspend` is only right for a fire-and-forget
coroutine that nobody holds a handle to.
