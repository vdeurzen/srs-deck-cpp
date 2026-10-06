---
id: coroutines-promise-return-value
kind: code
version: 1
level: 3
tags: [coroutines]
input: chips
choices:
  c1: ["return_value", "return_void", "yield_value", "await_transform"]
compile:
  harness: |
    Answer forty_two() { co_return 42; }
    int main() {
      auto a = forty_two();
      a.handle.resume();
      const int got = a.handle.promise().result;
      a.handle.destroy();
      return got == 42 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---

Give the promise the hook that `co_return 42;` needs.

```cpp
#include <coroutine>
struct Answer {
  struct promise_type {
    int result = 0;
    Answer get_return_object() { return Answer{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { return {}; }
    std::suspend_always final_suspend() noexcept { return {}; }
    void {{c1::return_value}}(int value) { result = value; }
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};
```

---

`co_return expr;` is rewritten as `promise.return_value(expr)`, so the
name has to be exactly that — the compiler looks the hook up by name,
not by signature. Storing the result in the promise, as here, is the
usual pattern: the frame outlives the `co_return` because
`final_suspend()` returns `suspend_always`, so the caller can still read
`handle.promise().result` before destroying the frame.

Note what makes this Card compile at all: a promise with only
`return_void` rejects `co_return 42;`, and a promise declaring *both*
`return_value` and `return_void` is ill-formed. One coroutine type
produces one kind of ending.
