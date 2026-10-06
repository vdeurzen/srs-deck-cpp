---
id: coroutines-await-transform-injection
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-await-transform-hook
  - coroutines-scheduling-promise-arguments
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

## You want `co_await read(fd, buf)` inside a task to use *that task's* I/O context, with no global runtime. How does `await_transform` get you there?

---

**Store the context in the promise; `await_transform` binds each
operation description to it.**

```cpp
struct promise_type {
  IoContext* io;                       // from the coroutine's own arguments
  explicit promise_type(IoContext& c, auto&&...) : io(&c) {}
  auto await_transform(ReadOp op) { return BoundRead{*io, op}; }
  // ...
};
```

`read(fd, buf)` returns a plain description; the promise, which knows
the context, builds the awaiter that submits it. Callers never name the
context and nothing is looked up. A description the context cannot
serve has no overload and fails to compile.
