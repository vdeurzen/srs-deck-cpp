---
id: chunks-awaiter-skeleton
kind: chunk
version: 1
level: 3
tags: [idioms, coroutines]
requires:
  - coroutines-suspension-points-cloze
expose_ms: 9000
compile:
  harness: |
    struct Task {
      struct promise_type {
        Task get_return_object() { return {}; }
        std::suspend_never initial_suspend() noexcept { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
      };
    };
    Task use() {
      const int value = co_await Ready{};
      (void)value;
    }
    int main() { use(); }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

```cpp
#include <coroutine>
struct Ready {
  bool await_ready() const noexcept { return true; }
  void await_suspend(std::coroutine_handle<>) const noexcept {}
  int await_resume() const noexcept { return 42; }
};
```

---

The awaiter: three hooks, always the same three names, in the order the
compiler asks for them. Recognising this shape as one unit is what makes
unfamiliar async libraries readable — a socket read, a timer, a
scheduler hop and a task continuation are all this struct with
different contents.

Read the signatures rather than the bodies: `await_ready` returning
`true` is the no-suspension fast path, `await_suspend`'s parameter is
the handle to *this* coroutine and its return type chooses what happens
next (`void` return to the resumer, `bool` conditionally, a handle for
symmetric transfer), and `await_resume`'s return type is the type of
the whole `co_await` expression.
