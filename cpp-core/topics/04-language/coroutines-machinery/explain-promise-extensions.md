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
  - coroutines-scheduling-promise-arguments
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
Beyond the mandatory hooks, explain the optional members a
`promise_type` can add and what each one buys the coroutine type.
---
- [ ] `yield_value(v)` enables `co_yield`; it returns an awaitable, so it can suspend *and* transport a value
- [ ] `await_transform(e)` intercepts every `co_await` in the body — to inject a scheduler or I/O context, or as a deleted overload to forbid awaiting entirely
- [ ] `operator new`/`operator delete` looked up in the promise's scope put frames in a pool instead of on the global heap
- [ ] A constructor callable with the coroutine's own arguments receives them, so context (pool, stop token, allocator) arrives without a global
- [ ] A static `get_return_object_on_allocation_failure()` switches frame allocation to the nothrow form: on failure the caller receives that object instead of an exception
