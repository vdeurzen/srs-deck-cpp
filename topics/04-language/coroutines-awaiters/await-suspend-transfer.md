---
id: coroutines-await-suspend-transfer
kind: code
version: 1
level: 5
tags: [coroutines]
input: chips
choices:
  c1: ["std::coroutine_handle<>", "void", "bool", "std::suspend_always"]
compile:
  harness: |
    #include <type_traits>
    #include <utility>
    static_assert(
        std::is_same_v<decltype(std::declval<ResumeNext&>().await_suspend(
                           std::coroutine_handle<>{})),
                       std::coroutine_handle<>>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/coroutine/noop_coroutine
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

Complete the awaiter so suspending this coroutine resumes `next` by
symmetric transfer.

```cpp
#include <coroutine>
struct ResumeNext {
  std::coroutine_handle<> next;
  bool await_ready() const noexcept { return false; }
  {{c1::std\::coroutine_handle<>}} await_suspend(std::coroutine_handle<>) noexcept { return next; }
  void await_resume() const noexcept {}
};
```

---

Returning a handle from `await_suspend` says "suspend me and resume
*that* one instead". The compiler turns it into a tail call, so the
stack frame of the suspending coroutine's `resume()` is reused rather
than stacked on top of — which is the whole point.

Writing `void await_suspend(...) { next.resume(); }` looks equivalent
and is not: each hand-off then nests one `resume()` inside another, so a
chain of tasks awaiting tasks, or a ping-pong between two coroutines,
grows the stack until it overflows. The handle-returning form makes the
same chain run in constant stack.

When there is nothing to transfer to, return `std::noop_coroutine()`
rather than a null handle: resuming a null handle is undefined, while
the no-op coroutine is a real, resumable handle whose resumption does
nothing and hands control back to the resumer.
