---
id: coroutines-explain-promise-hooks
kind: explain
version: 1
level: 5
tags: [coroutines]
requires:
  - coroutines-eager-vs-lazy-start
  - coroutines-final-suspend-noexcept
  - coroutines-co-return-forms
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
Explain the five hooks every `promise_type` must provide, and what each
one decides.
---
- [ ] `get_return_object()` — builds what the caller receives, usually from `coroutine_handle<promise_type>::from_promise(*this)`, and runs before `initial_suspend()`
- [ ] `initial_suspend()` — `suspend_always` for a lazy type (generator, task), `suspend_never` for an eager one; decides who chooses when, and on which thread, the body starts
- [ ] `final_suspend()` — must be `noexcept`; `suspend_always` keeps the frame alive so the caller can read the result and destroy it, `suspend_never` makes the coroutine free itself
- [ ] Exactly one of `return_void()` or `return_value(v)`, never both; which one fixes what `co_return` may carry
- [ ] `unhandled_exception()` — usually stores `std::current_exception()` for the consumer to rethrow; rethrowing instead propagates it to the resumer
