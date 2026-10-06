---
id: coroutines-generator-yield-value
kind: code
version: 1
level: 3
tags: [coroutines]
requires:
  - coroutines-promise-type-cloze
input: chips
choices:
  c1: ["yield_value", "return_value", "await_transform", "yield"]
compile:
  harness: |
    Generator<int> ones() {
      co_yield 1;
      co_yield 1;
    }
    int main() {
      auto g = ones();
      g.handle.resume();
      g.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_yield
---

Give the promise the hook `co_yield` is rewritten into.

```cpp
#include <coroutine>
template <typename T>
struct Generator {
  struct promise_type {
    T current;
    Generator get_return_object() { return Generator{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    std::suspend_always {{c1::yield_value}}(T value) { current = value; return {}; }
    void return_void() {}
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};
```

---

`co_yield e;` is defined as exactly `co_await promise.yield_value(e);`
— it is not a separate mechanism, just a named shortcut. That identity
explains both halves of the signature: the parameter is how the value
gets *out* (stored in the promise, where the consumer can read it), and
the **return type is an awaitable**, which is how the coroutine
suspends afterwards.

Returning something other than `suspend_always` is a real technique
rather than a mistake: returning `suspend_never` makes `co_yield` push a
value without pausing, and returning a custom awaiter lets a channel
suspend only when its buffer is full.
