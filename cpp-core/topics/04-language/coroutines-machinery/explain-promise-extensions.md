---
id: coroutines-explain-promise-extensions
kind: explain
version: 2
level: 5
tags: [coroutines]
requires:
  - coroutines-generator-yield-value
  - coroutines-await-transform-hook
  - coroutines-frame-operator-new
  - coroutines-scheduling-promise-arguments
elaborate: Which of these would you add first to a task type for a server you know, and what would it replace?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
A colleague asks what a `promise_type` can do beyond the members every
promise must declare. Explain it to them.
---
- [ ] `yield_value(v)` enables `co_yield`; it returns an awaitable, so it can suspend and pass a value out
- [ ] `await_transform(e)` intercepts every `co_await` in the body, for instance to inject a scheduler
- [ ] A deleted `await_transform` forbids `co_await` in the body entirely, as `std::generator` does
- [ ] A `promise_type::operator new` puts frames in a pool instead of on the global heap
- [ ] A promise constructor taking the coroutine's own arguments receives them, so context arrives without a global
