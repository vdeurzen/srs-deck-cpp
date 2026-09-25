---
id: coroutines-explain-transformation
kind: explain
version: 1
level: 4
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---
A colleague asks what the compiler actually does to a function once you
put a `co_await` in it. Explain the transformation end to end.
---
- [ ] The return type names a `promise_type` (directly or through `std::coroutine_traits`); without one the function does not compile
- [ ] A frame is allocated — by `promise_type::operator new` if it declares one, else global `operator new` — and holds the promise, the copied parameters, and every local that is live across a suspension point
- [ ] Parameters are copied (or moved) into the frame; a *reference* parameter copies the reference, not the referent
- [ ] `get_return_object()` is called before `initial_suspend()`, and its result is what the caller gets at the first suspension
- [ ] The body is wrapped in `try`/`catch(...)`, whose handler calls `unhandled_exception()`
- [ ] Every exit path runs `return_void()`/`return_value(expr)` and then `co_await promise.final_suspend()`
- [ ] `co_await e` becomes: `await_transform` if the promise has one, then `operator co_await` if there is one, then `await_ready` / `await_suspend` / `await_resume`
- [ ] `co_yield e` is exactly `co_await promise.yield_value(e)`
- [ ] Resuming means jumping back to a state machine's saved resume point — `coroutine_handle::resume()` is an ordinary call, and it returns when the coroutine next suspends or finishes
- [ ] The frame is freed when the coroutine runs off the end without suspending at `final_suspend`, or when someone calls `destroy()`
