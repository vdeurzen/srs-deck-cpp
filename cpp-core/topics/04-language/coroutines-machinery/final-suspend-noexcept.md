---
id: coroutines-final-suspend-noexcept
kind: code
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-return-object-timing
input: chips
choices:
  c1: ["noexcept", "const", "noexcept(false)", "&"]
compile:
  harness: |
    Task nothing() { co_return; }
    int main() {
      auto t = nothing();
      t.handle.resume();
      t.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

Complete `final_suspend`'s declaration so this promise is a legal
coroutine promise.

```cpp
#include <coroutine>
struct Task {
  struct promise_type {
    Task get_return_object() { return Task{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() {{c1::noexcept}} { return {}; }
    void return_void() {}
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};
```

---

The standard requires `final_suspend()` to be `noexcept`, and the
compiler enforces it: GCC rejects anything else with *"'final_suspend'
must be declared 'noexcept'"*. The reason is that it runs at the one
point where there is no longer anywhere to put an exception — the
body is over, `unhandled_exception()` has already had its chance, and
the frame is about to be handed back or destroyed. Allowing a throw
there would mean unwinding out of a coroutine that has no caller on the
stack.

`initial_suspend()` carries no such requirement: an exception from it
propagates out of the call that created the coroutine, where the caller
can still catch it.
