---
id: coroutines-awaiter-await-ready
kind: code
version: 1
level: 3
tags: [coroutines]
input: chips
choices:
  c1: ["await_ready", "ready", "is_ready", "await_suspend"]
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
      const int value = co_await AlwaysReady{};
      (void)value;
    }
    int main() { use(); }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

Name the hook that lets an awaiter skip suspending altogether.

```cpp
#include <coroutine>
struct AlwaysReady {
  bool {{c1::await_ready}}() const noexcept { return true; }
  void await_suspend(std::coroutine_handle<>) const noexcept {}
  int await_resume() const noexcept { return 7; }
};
```

---

`await_ready()` is asked first, and returning `true` means "the value is
already here" — the coroutine never suspends, `await_suspend` is never
called, and `co_await` collapses to just `await_resume()`. That fast
path is what keeps an awaitable cheap when the data is already buffered,
the future is already satisfied, or the socket already has bytes: no
frame is saved and no scheduler is touched.

The three names are fixed and looked up by name on the awaiter, so
`ready` or `is_ready` does not compile. Note the shape of the trio:
`await_ready` decides *whether*, `await_suspend` decides *what happens
while suspended*, and `await_resume` produces the value of the whole
`co_await` expression — here, an `int`.
