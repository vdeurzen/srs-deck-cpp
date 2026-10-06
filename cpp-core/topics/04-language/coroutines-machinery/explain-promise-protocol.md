---
id: coroutines-explain-promise-protocol
kind: explain
version: 2
level: 5
tags: [coroutines]
requires:
  - coroutines-explain-promise-hooks
  - coroutines-explain-promise-extensions
  - coroutines-symmetric-transfer
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
Put it together: a generator type and a task type use the same promise
hooks. Explain how the same hooks give each its behaviour, and why both
end up owning their frame through the return type.
---
- [ ] They differ in who resumes: a generator is resumed by its consumer's `operator++`, a task by its own `final_suspend` awaiter handing on the stored continuation — so `yield_value` is the generator's channel out and the continuation handle is the task's
- [ ] Both start lazily for the same reason: `suspend_always` from `initial_suspend` hands the caller the return object before any body runs, so the caller decides when, and on which thread, work begins
- [ ] Both suspend at the end for the same reason: `suspend_always` from `final_suspend` keeps the frame alive so the result — `return_value`, the last `yield_value`, or a stored exception — can be read; therefore the return type must be the one that calls `destroy()`
- [ ] Because `final_suspend` is `noexcept` and runs after `unhandled_exception()`, failure is a promise *member*, not an unwinding path: the consumer rethrows what the promise stored, at `operator++` or at the awaiting `co_await`
- [ ] A fire-and-forget type inverts both choices — `suspend_never` at both ends — and that is exactly why nobody may hold a handle to it: the frame frees itself, so the return type owns nothing
