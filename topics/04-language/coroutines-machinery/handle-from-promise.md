---
id: coroutines-handle-from-promise
kind: code
version: 1
level: 4
tags: [coroutines]
input: chips
choices:
  c1: ["from_promise", "from_address", "promise", "address"]
compile:
  harness: |
    #include <type_traits>
    #include <utility>
    static_assert(std::is_same_v<
        decltype(std::declval<Task::promise_type&>().get_return_object()),
        Task>);
    Task nothing() { co_return; }
    int main() {
      auto t = nothing();
      t.handle.resume();
      t.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/from_promise
---

Recover the handle for the coroutine this promise belongs to, so the
return object can carry it back to the caller.

```cpp
#include <coroutine>
struct Task {
  struct promise_type {
    Task get_return_object() { return Task{Handle::{{c1::from_promise}}(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void return_void() {}
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};
```

---

`coroutine_handle<P>::from_promise(p)` is the inverse of
`handle.promise()`: given a reference to the promise the compiler
constructed inside the frame, it reconstructs the handle to that frame.
It is a static member, and it is the only way out — the promise itself
is never told its own handle.

`from_address` is the other direction of type erasure, taking the
`void*` from `handle.address()`, and it is how a C callback or a
kernel completion queue gets back a handle it stashed earlier.
