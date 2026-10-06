---
id: coroutines-await-transform-passthrough
kind: code
version: 1
level: 5
tags: [coroutines]
requires:
  - coroutines-await-transform-hook
input: chips
choices:
  c1: ["A&&", "void", "std::suspend_never", "ReadOp"]
compile:
  harness: |
    struct Foreign {
      Foreign() = default;
      Foreign(const Foreign&) = delete;
      bool await_ready() const noexcept { return true; }
      void await_suspend(std::coroutine_handle<>) const noexcept {}
      int await_resume() const noexcept { return 1; }
    };
    Task both() {
      co_await ReadOp{3};
      const int v = co_await Foreign{};
      (void)v;
    }
    int main() {
      auto t = both();
      t.handle.resume();
      t.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

This promise turns a `ReadOp` into its own awaiter. Complete the second
overload so every *other* awaitable still passes through unchanged —
without it, `co_await` on anything but a `ReadOp` no longer compiles.

```cpp
#include <coroutine>
struct ReadOp { int fd; };
struct Task {
  struct promise_type {
    Task get_return_object() { return Task{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    std::suspend_never await_transform(ReadOp) noexcept { return {}; }
    template <typename A>
    {{c1::A&&}} await_transform(A&& a) noexcept { return static_cast<A&&>(a); }
    void return_void() {}
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};
```

---

One `await_transform` declaration captures every `co_await` in the
coroutine, with no fall-back to the untransformed operand — so the
promise now owns the vocabulary of awaitables, and foreign ones need
an explicit pass-through. Forwarding the operand back out as `A&&`
keeps its value category and avoids a copy (the harness's `Foreign`
is not copyable); returning `void` or a fixed awaiter type would turn
the pass-through into a rejection.
