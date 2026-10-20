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
  c1: ["A&&", "auto", "A", "A&"]
compile:
  harness: |
    struct Foreign : std::suspend_never {
      Foreign() = default;
      Foreign(const Foreign&) = delete;
    };
    struct Task;
    struct Hooks {
      Task get_return_object();
      std::suspend_never initial_suspend() noexcept { return {}; }
      std::suspend_never final_suspend() noexcept { return {}; }
      void return_void() {}
      void unhandled_exception() {}
    };
    struct Task { using promise_type = Promise<Hooks>; };
    Task Hooks::get_return_object() { return {}; }
    Task both() {
      co_await ReadOp{3};
      co_await Foreign{};
    }
    int main() { both(); }
elaborate: Where else does returning `A&&` from a forwarding function keep a non-copyable argument usable, and what would `auto` break there?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

This promise turns a `ReadOp` into its own awaiter; its base `Hooks`
supplies the other required promise members. Complete the second
overload so every *other* awaitable, such as `Foreign` (another
library's awaiter, which cannot be copied), still passes through
unchanged. Without it, `co_await` on anything but a `ReadOp` no longer
compiles.

```cpp
#include <coroutine>
struct ReadOp { int fd; };
template <typename Hooks>
struct Promise : Hooks {
  std::suspend_never await_transform(ReadOp) noexcept { return {}; }
  template <typename A>
  {{c1::A&&}} await_transform(A&& a) noexcept { return static_cast<A&&>(a); }
};
```

---

One `await_transform` declaration captures every `co_await` in the
coroutine, with no fall-back to the untransformed operand — so the
promise now owns the vocabulary of awaitables, and foreign ones need
an explicit pass-through. Returning `A&&` hands the operand back with
its value category intact and nothing constructed. `auto` and `A` both
deduce a decayed `Foreign` and try to copy it out of the xvalue, which
its deleted copy constructor forbids; `A&` cannot bind an lvalue
reference to that xvalue at all. Each is a rejection dressed as a
pass-through.
