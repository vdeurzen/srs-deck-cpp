---
id: coroutines-handle-typed-vs-erased
kind: code
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-promise-type-cloze
  - coroutines-handle-operations
input: chips
choices:
  c1:
    - "std::coroutine_handle<promise_type>"
    - "std::coroutine_handle<>"
    - "std::coroutine_handle<Counter>"
    - "std::coroutine_handle<void>"
compile:
  harness: |
    Counter ticking() { co_return; }
    int main() {
      auto c = ticking();
      c.handle.promise().ticks = 1;
      c.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

Give `Counter` the handle type that can still reach its own promise.

```cpp
#include <coroutine>
struct Counter {
  struct promise_type {
    int ticks = 0;
    Counter get_return_object() { return Counter{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() {}
  };
  using Handle = {{c1::std\::coroutine_handle<promise_type>}};
  Handle handle;
};
```

---

There are two handle types and they are not interchangeable.
`std::coroutine_handle<P>` knows the promise type, so it has
`promise()` and the static `from_promise()`.
`std::coroutine_handle<>` — which is `std::coroutine_handle<void>`, the
same type spelled two ways — is the **type-erased** one: it can
`resume()`, `destroy()` and report `done()`, but it cannot reach the
promise, because it no longer knows what is there.

That erasure is a feature, not a loss. A scheduler or an event loop
queues `coroutine_handle<>` precisely so it can hold handles to
coroutines of every return type at once; the typed handle stays with
the code that owns the promise and needs its result.
