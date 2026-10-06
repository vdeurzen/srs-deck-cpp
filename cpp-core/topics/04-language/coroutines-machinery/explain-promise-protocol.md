---
id: coroutines-explain-promise-protocol
kind: explain
version: 1
level: 5
tags: [coroutines]
requires:
  - coroutines-done-and-destroy-preconditions
  - coroutines-frame-allocation
  - coroutines-symmetric-transfer
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---
You are designing a coroutine return type from scratch. Explain what its
`promise_type` must provide, and what each decision buys you.
---
- [ ] `get_return_object()` — builds what the caller receives, usually from `coroutine_handle<promise_type>::from_promise(*this)`, and runs before `initial_suspend()`
- [ ] `initial_suspend()` — `suspend_always` for a lazy type (generator, task), `suspend_never` for an eager one; decides who chooses the starting thread
- [ ] `final_suspend()` — must be `noexcept`; `suspend_always` keeps the frame alive so the caller can read the result and destroy it, `suspend_never` makes the coroutine free itself
- [ ] Exactly one of `return_void()` or `return_value(v)`, never both
- [ ] `unhandled_exception()` — usually stores `std::current_exception()` for the consumer to rethrow
- [ ] `yield_value(v)` if the type supports `co_yield`; it returns an awaitable, so it can suspend *and* transport a value
- [ ] `await_transform(e)` if awaits should be intercepted — to inject a scheduler, or deleted to forbid `co_await` entirely
- [ ] `operator new`/`operator delete` if frames should come from a pool, plus `get_return_object_on_allocation_failure()` for nothrow allocation
- [ ] The return type itself must own the frame: destroy it in the destructor, and be move-only, or two handles will `destroy()` the same frame
- [ ] A task-shaped type also stores the awaiting coroutine's handle and returns it from `final_suspend`'s awaiter, so the continuation resumes by symmetric transfer
