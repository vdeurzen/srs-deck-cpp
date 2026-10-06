---
id: coroutines-explain-body-lowering
kind: explain
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-plain-return-forbidden
  - coroutines-awaitable-vs-awaiter
  - coroutines-generator-yield-value
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---
Explain what the compiler rewrites each of `co_await`, `co_yield`,
`co_return` and an uncaught exception into inside a coroutine body.
---
- [ ] The body is wrapped in `try`/`catch(...)`, whose handler calls `promise.unhandled_exception()`
- [ ] Every normal exit path runs `return_void()` or `return_value(expr)` and then `co_await promise.final_suspend()`; a plain `return` is ill-formed
- [ ] `co_await e` becomes: `await_transform(e)` if the promise declares one, then `operator co_await` if there is one, then `await_ready` / `await_suspend` / `await_resume` on the awaiter
- [ ] `co_yield e` is exactly `co_await promise.yield_value(e)`
- [ ] A suspension stores the resume point in the frame and returns control to the resumer; `coroutine_handle::resume()` is an ordinary call that returns when the coroutine next suspends or finishes
