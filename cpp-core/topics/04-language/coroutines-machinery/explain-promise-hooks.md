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
  - coroutines-eager-start-exception
elaborate: Which of these members would you change to make a lazy task type eager, and what new risk would that bring?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
A colleague asks which members every `promise_type` must declare, and why
each is needed. Explain it to them.
---
- [ ] `get_return_object()` builds what the caller receives, and runs before `initial_suspend()`
- [ ] `initial_suspend()` returns `suspend_always` for a lazy type, `suspend_never` for one whose body starts at once
- [ ] `final_suspend()` must be `noexcept`; `suspend_always` there keeps the frame alive so the result can be read
- [ ] Exactly one of `return_void()` or `return_value(v)`, never both, decides what `co_return` may carry
- [ ] `unhandled_exception()` usually stores `std::current_exception()` so the consumer can rethrow it later
