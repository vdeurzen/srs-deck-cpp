---
id: coroutines-scheduling-context-without-globals
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-scheduling-promise-arguments
  - coroutines-scheduling-schedule-awaiter
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

## You refuse to have a global executor. Where can a coroutine's scheduler or I/O context actually live, and what does each choice cost?

---

There are three places, and a mature design usually uses all three.

**In the awaitable.** `co_await read(ring, fd, buf)` names the context
at every use. Maximally explicit and completely local, but the context
has to be threaded through every helper that builds operations, and the
call sites get noisy.

**In the promise.** Declare the coroutine as
`task run(IoContext& io, int fd)`; the promise constructor receives the
coroutine's arguments and stores the context. Callers pass it once, at
the boundary, and the body is clean. The cost is that the context
becomes part of the coroutine *type*'s contract.

**Queried from the promise by the awaiter.** An awaiter can template
its hook on the promise type and read it back:

```cpp
struct Reschedule {
  bool await_ready() const noexcept { return false; }
  template <typename Promise>
  void await_suspend(std::coroutine_handle<Promise> h) const {
    h.promise().pool->enqueue(h);
  }
  void await_resume() const noexcept {}
};
```

Now the awaitable is context-free and reusable across coroutine types,
and the body says `co_await Reschedule{}` without naming anything. This
is the coroutine spelling of an *environment query* — the same idea
`std::execution` standardises as `get_scheduler(get_env(rcvr))`, where
the receiver carries the environment down the chain instead of a
global.

The rule that falls out: a child coroutine inherits its parent's
context because the parent passed it, either as an argument or by
awaiting through an awaiter that queries the parent's promise. Nothing
is looked up; everything arrives.
