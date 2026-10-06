---
id: parsons-coroutine-generator-skeleton
kind: parsons
version: 1
level: 4
tags: [idioms, coroutines]
requires:
  - coroutines-generator-yield-value
  - coroutines-handle-operations
compile:
  harness: |
    Generator<int> count_to(int n) {
      for (int i = 1; i <= n; ++i) co_yield i;
    }
    int main() {
      auto gen = count_to(3);
      int sum = 0;
      while (gen.next()) sum += gen.value();
      return sum == 6 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

```cpp
#include <coroutine>
template <typename T>
struct Generator {
  struct promise_type {
    T current_value;
    Generator get_return_object() { return Generator{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    std::suspend_always yield_value(T value) {
      current_value = value;
      return {};
    }
    void return_void() {}
    void unhandled_exception() { throw; }
  };
  using Handle = std::coroutine_handle<promise_type>;
  explicit Generator(Handle h) : handle_(h) {}
  ~Generator() { if (handle_) handle_.destroy(); }
  bool next() {
    handle_.resume();
    return !handle_.done();
  }
  T value() const { return handle_.promise().current_value; }
  Handle handle_;
};
```

---

The minimum a return type needs to make a function a coroutine: a nested
`promise_type` with `get_return_object`, `initial_suspend`,
`final_suspend`, a way to produce a value (`yield_value` here, since the
harness uses `co_yield`), a way to end (`return_void` or `return_value`),
and `unhandled_exception`. `std::generator<T>` (C++23) packages exactly
this skeleton so most callers never have to write it by hand.
