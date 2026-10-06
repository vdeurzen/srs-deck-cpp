---
id: coroutines-handle-from-address
kind: code
version: 1
level: 3
tags: [coroutines]
requires:
  - coroutines-handle-operations
input: chips
choices:
  c1: ["from_address", "from_promise", "address", "promise"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(on_complete(nullptr)), std::coroutine_handle<>>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/from_address
---

A C completion callback gets back the `void*` that was stored from
`h.address()` when the operation was submitted. Rebuild the handle.

```cpp
#include <coroutine>
std::coroutine_handle<> on_complete(void* user_data) {
  return std::coroutine_handle<>::{{c1::from_address}}(user_data);
}
```

---

`from_address` is the inverse of `address()`: the static member that
turns the erased `void*` back into a resumable handle. It is the only
way back from a C API — `io_uring`'s `user_data`, an `epoll` cookie, a
timer's context pointer. `from_promise` is the other static constructor,
and it exists only on the *typed* `coroutine_handle<P>`, because only a
typed handle knows which promise type it is looking at.
