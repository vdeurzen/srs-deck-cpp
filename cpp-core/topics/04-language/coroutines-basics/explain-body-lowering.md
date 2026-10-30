---
id: coroutines-explain-body-lowering
kind: explain
version: 2
level: 4
tags: [coroutines]
requires:
  - coroutines-plain-return-forbidden
  - coroutines-awaitable-vs-awaiter
  - coroutines-generator-yield-value
  - coroutines-eager-start-exception
elaborate: Which of these rewrites would you customise first in a promise type of your own, and what would it buy you?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---
A colleague asks what the compiler turns a coroutine's body into. Explain it
to them.
---
- [ ] The body is wrapped in `try`/`catch(...)`, whose handler calls `promise.unhandled_exception()`
- [ ] `co_return` becomes `promise.return_void()` or `promise.return_value(e)`; a plain `return` is ill-formed
- [ ] Every way out of the body then runs `co_await promise.final_suspend()`
- [ ] `co_await e` finds its awaiter via `await_transform`, then `operator co_await`, then calls `await_ready`, `await_suspend`, `await_resume`
- [ ] `co_yield e` is exactly `co_await promise.yield_value(e)`
