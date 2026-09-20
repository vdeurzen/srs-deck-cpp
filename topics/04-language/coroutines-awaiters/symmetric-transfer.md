---
id: coroutines-symmetric-transfer
kind: basic
version: 1
level: 5
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/coroutine/noop_coroutine
  - https://wg21.link/p0913
---

## A `task` resumes its awaiting continuation when it finishes. Why must that hand-off happen in `final_suspend`'s awaiter, and not with a plain `continuation.resume()`?

---

Because a plain `resume()` is an ordinary call and consumes stack. The
inner coroutine's `resume()` frame is still live while the continuation
runs, and if that continuation awaits another task which finishes
immediately, the frames pile up. A loop of tasks that complete
synchronously — the common case for cached or already-satisfied work —
then overflows the stack after a few thousand iterations, in a program
that looks perfectly structured.

Symmetric transfer removes the nesting. The promise's `final_suspend()`
returns an awaiter whose `await_suspend` **returns** the continuation's
handle:

```cpp
struct FinalAwaiter {
  bool await_ready() const noexcept { return false; }
  std::coroutine_handle<> await_suspend(Handle h) noexcept {
    auto continuation = h.promise().continuation;
    return continuation ? continuation : std::noop_coroutine();
  }
  void await_resume() const noexcept {}
};
```

The compiler compiles that into a tail call: the finishing coroutine's
resume returns, and the continuation is resumed from the same stack
slot. Depth stays constant no matter how long the chain is. This is
exactly what P0913 added symmetric transfer and `noop_coroutine()` for,
and it is the single most important structural detail of a hand-written
`task` type.
