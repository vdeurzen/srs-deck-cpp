---
id: coroutines-await-transform-injection
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

## You want `co_await read(fd, buf)` inside a task to use *that task's* I/O context, with no global runtime. How does `await_transform` get you there?

---

By making the context part of the coroutine's promise, and letting
`await_transform` marry the two:

```cpp
struct promise_type {
  IoContext* io;                       // set when the task was created
  explicit promise_type(IoContext& c, auto&&...) : io(&c) {}
  auto await_transform(ReadOp op) { return BoundRead{*io, op}; }
  // ...
};
```

`read(fd, buf)` now returns a *description* — a plain value with no
context in it — and the awaiter that actually submits the operation is
built by the promise, which knows where to submit it. Callers write
`co_await read(fd, buf)` and never mention the context; nothing is
looked up in a global.

Two details make it work. The promise's constructor receives the
coroutine's own arguments, so a task declared as
`task run(IoContext& io, int fd)` gets its context without the body
doing anything. And `await_transform` also lets the promise *refuse*
things: an operation description that this task's context cannot serve
simply has no overload, and the `co_await` fails to compile rather than
reaching for a default runtime at run time.

The cost is that the promise now owns the vocabulary of awaitables, so
awaiting a foreign awaitable needs an explicit pass-through overload —
usually `template <typename A> A&& await_transform(A&& a) { return
static_cast<A&&>(a); }`.
