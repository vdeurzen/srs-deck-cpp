---
id: coroutines-return-object-timing
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-promise-type-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## In what order does the compiler call `get_return_object()` and `initial_suspend()` — and when does the caller actually receive the return object?

---

`get_return_object()` runs **first**, before `initial_suspend()` is even
called. The rewritten body is, in order:

1. allocate the frame and copy the parameters into it;
2. construct the `promise_type`;
3. call `promise.get_return_object()` and keep the result aside;
4. `co_await promise.initial_suspend();`
5. the author's body, then `return_void`/`return_value`;
6. `co_await promise.final_suspend();`

The caller receives the object from step 3 **when the coroutine first
suspends** (or returns, for an eager coroutine that never suspends).
That ordering is what makes the usual `Handle::from_promise(*this)`
idiom work: the promise already exists at step 3, so the return object
can capture a handle to a coroutine whose body has not started.

It also explains a subtle rule — the return object must be constructible
before the body runs, so it cannot depend on anything the body computes.
Verified against GCC 13.3: logging each hook prints `G` then `I` before
the caller's first line after the call.
