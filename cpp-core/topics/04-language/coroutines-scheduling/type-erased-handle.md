---
id: coroutines-scheduling-type-erased-handle
kind: code
version: 1
level: 4
tags: [coroutines, scheduling]
requires:
  - coroutines-handle-typed-vs-erased
  - coroutines-suspension-points-cloze
input: chips
choices:
  c1:
    - "std::coroutine_handle<>"
    - "std::coroutine_handle<Task::promise_type>"
    - "void*"
    - "std::suspend_always"
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
    struct Job {
      struct promise_type {
        Job get_return_object() { return {}; }
        std::suspend_never initial_suspend() noexcept { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
      };
    };
    Task one(Pool& pool) { co_await ScheduleOn{pool}; }
    Job two(Pool& pool) { co_await ScheduleOn{pool}; }
    int main() {
      Pool pool;
      one(pool);
      two(pool);
    }
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

Two different coroutine types — `Task` and `Job` — both await
`ScheduleOn`. Give `await_suspend` the parameter type that lets one
pool serve both.

```cpp
#include <coroutine>
#include <deque>
struct Pool {
  std::deque<std::coroutine_handle<>> ready;
  void enqueue(std::coroutine_handle<> h) { ready.push_back(h); }
};
struct ScheduleOn {
  Pool& pool;
  bool await_ready() const noexcept { return false; }
  void await_suspend({{c1::std\::coroutine_handle<>}} h) const { pool.enqueue(h); }
  void await_resume() const noexcept {}
};
```

---

The compiler passes `await_suspend` a
`std::coroutine_handle<P>` for the *awaiting* coroutine's promise type
`P`, and that call has to be valid for every coroutine that awaits this
awaiter. The awaiter, though, is written before any of them exist —
here `Task` and `Job` are not even declared yet — so naming a concrete
promise type is impossible, and would be wrong anyway: it would serve
exactly one coroutine type and reject the next one.

`std::coroutine_handle<>` accepts them all, because every typed handle
converts to the erased one. That is what lets a scheduler be a plain
queue of `coroutine_handle<>` — the pool moves work without knowing a
single thing about the coroutine types it is resuming, and no part of
the design needs a common base class or a `std::function` wrapper.

The erased handle is also what you store in a C API's `void*`:
`h.address()` on the way out,
`std::coroutine_handle<>::from_address(p)` on the way back in.
