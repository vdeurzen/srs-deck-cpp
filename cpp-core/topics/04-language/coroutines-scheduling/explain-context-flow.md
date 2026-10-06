---
id: coroutines-scheduling-explain-context-flow
kind: explain
version: 1
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-scheduling-awaiter-queries-promise
  - coroutines-scheduling-thread-affinity
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---
Sketch how a coroutine runtime over a thread pool gets every coroutine
its scheduler without a global or a thread-local. Name each hand-off.
---
- [ ] Ownership at the top: `main` constructs the pool on the stack and passes references down; nothing is looked up, so tests can construct their own
- [ ] The context reaches a coroutine through its arguments, and the promise constructor — which receives the coroutine's own arguments — stores it, so the body never repeats it
- [ ] Awaiters that need the context template `await_suspend` on the promise type and read `h.promise()`, the coroutine equivalent of an environment query
- [ ] The scheduler's currency is `std::coroutine_handle<>`: type-erased, so one queue serves every coroutine type without a base class or `std::function`
- [ ] Completions are re-posted to the pool rather than resumed inline, so every thread change is an explicit `co_await sched.schedule()` visible in the source
