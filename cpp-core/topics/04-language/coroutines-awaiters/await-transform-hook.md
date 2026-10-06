---
id: coroutines-await-transform-hook
kind: code
version: 1
level: 5
tags: [coroutines]
requires:
  - coroutines-awaitable-vs-awaiter
input: chips
choices:
  c1: ["await_transform", "await_ready", "transform", "yield_value"]
compile:
  harness: |
    Lazy counts() { co_await 42; }
    int main() {
      auto l = counts();
      l.handle.resume();
      l.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

`int` is not awaitable. Add the promise hook that makes `co_await 42;`
legal inside a `Lazy`.

```cpp
#include <coroutine>
struct Lazy {
  struct promise_type {
    Lazy get_return_object() { return Lazy{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    std::suspend_never {{c1::await_transform}}(int) noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};
```

---

`await_transform` is the promise's chance to rewrite every `co_await`
in its coroutine before anything else happens. It turns "what can be
awaited here" into a property of the coroutine *type* rather than of the
awaited object, which is what makes it the injection point: the promise
holds the scheduler or the I/O context, and `await_transform` binds a
plain descriptor such as `read(fd, buf)` to it.

It is all or nothing. Declaring one overload means every `co_await` in
that coroutine goes through `await_transform`, with no fall-back for
types it does not accept — deliberately so: `std::generator`'s promise
declares `await_transform` **deleted**, which is how a synchronous pull
generator forbids `co_await` outright.
