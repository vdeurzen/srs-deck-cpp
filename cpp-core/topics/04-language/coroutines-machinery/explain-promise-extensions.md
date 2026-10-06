---
id: coroutines-explain-promise-extensions
kind: explain
version: 1
level: 5
tags: [coroutines]
requires:
  - coroutines-generator-yield-value
  - coroutines-await-transform-hook
  - coroutines-frame-operator-new
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
Beyond the mandatory hooks, explain the optional members a
`promise_type` can add and what each one buys the coroutine type.
---
- [ ] `yield_value(v)` enables `co_yield`; it returns an awaitable, so it can suspend *and* transport a value
- [ ] `await_transform(e)` intercepts every `co_await` in the body — to inject a scheduler or I/O context, or as a deleted overload to forbid awaiting entirely
- [ ] `operator new`/`operator delete` put frames in a pool; a static `get_return_object_on_allocation_failure()` switches to nothrow allocation
- [ ] A constructor callable with the coroutine's own arguments receives them, so context (pool, stop token, allocator) arrives without a global
- [ ] `operator new` may also take the coroutine's arguments (by convention `std::allocator_arg` then an allocator), so frames come from a caller-supplied allocator rather than one fixed pool
