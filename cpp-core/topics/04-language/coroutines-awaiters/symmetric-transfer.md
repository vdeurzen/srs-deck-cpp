---
id: coroutines-symmetric-transfer
kind: basic
version: 1
level: 5
tags: [coroutines]
requires:
  - coroutines-await-suspend-return-types
  - coroutines-handle-typed-vs-erased
refs:
  - https://en.cppreference.com/w/cpp/coroutine/noop_coroutine
  - https://wg21.link/p0913
---

## A `task` resumes its awaiting continuation when it finishes. Why must that hand-off happen in `final_suspend`'s awaiter, and not with a plain `continuation.resume()`?

---

**Because `resume()` is an ordinary call: the `resume()` running the
finishing coroutine stays on the stack while the continuation runs.**
A chain of tasks completing synchronously nests one `resume()` per task
and overflows. Returning the continuation's handle from
`final_suspend`'s awaiter is a tail call instead (P0913): the finishing
resume returns and the continuation runs in the same stack slot.

```cpp
struct FinalAwaiter {
  bool await_ready() const noexcept { return false; }
  std::coroutine_handle<> await_suspend(Handle h) noexcept {
    auto c = h.promise().continuation;
    return c ? c : std::noop_coroutine();
  }
  void await_resume() const noexcept {}
};
```
