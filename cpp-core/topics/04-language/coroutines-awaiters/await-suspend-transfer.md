---
id: coroutines-await-suspend-transfer
kind: code
version: 2
level: 5
tags: [coroutines]
requires:
  - coroutines-await-suspend-return-types
input: chips
choices:
  c1: ["return next;", "next.resume();", "return next.resume();", "return false;"]
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

Complete `await_suspend` so suspending this coroutine hands control to
`next` by symmetric transfer.

```cpp
#include <coroutine>
struct ResumeNext {
  std::coroutine_handle<> next;
  bool await_ready() const noexcept { return false; }
  auto await_suspend(std::coroutine_handle<>) noexcept { {{c1::return next;}} }
  void await_resume() const noexcept {}
};
```

---

Returning a handle from `await_suspend` says "suspend me and resume
*that* one instead". The compiler turns it into a tail call, so the
stack frame of the suspending coroutine's `resume()` is reused rather
than stacked on top of — which is the whole point. The deduced return
type is `std::coroutine_handle<>`; real code spells it out.

Writing `next.resume();` looks equivalent and is not: each hand-off then
nests one `resume()` inside another, so a chain of tasks awaiting tasks,
or a ping-pong between two coroutines, grows the stack until it
overflows. `return next.resume();` is the same call with a `void`
result, and `return false;` resumes the *suspending* coroutine, not
`next`. Only the handle-returning form runs the chain in constant stack.

When there is nothing to transfer to, return `std::noop_coroutine()`
rather than a null handle: resuming a null handle is undefined, while
the no-op coroutine is a real, resumable handle whose resumption does
nothing and hands control back to the resumer.
