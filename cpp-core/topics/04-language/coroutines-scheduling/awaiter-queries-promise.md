---
id: coroutines-scheduling-awaiter-queries-promise
kind: code
version: 1
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-scheduling-context-without-globals
input: chips
choices:
  c1:
    - "template <typename Promise> void await_suspend(std::coroutine_handle<Promise> h) const"
    - "void await_suspend(std::coroutine_handle<> h) const"
    - "void await_suspend(std::coroutine_handle<Task::promise_type> h) const"
    - "template <typename Promise> void await_suspend(std::coroutine_handle<> h) const"
compile:
  harness: |
    struct Task {
      struct promise_type {
        Pool* pool;
        explicit promise_type(Pool& owner) : pool(&owner) {}
        Task get_return_object() {
          return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_always initial_suspend() noexcept { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
      };
      std::coroutine_handle<promise_type> handle;
    };
    Task hop(Pool& pool) {
      (void)pool;
      co_await Reschedule{};
    }
    int main() {
      Pool pool;
      auto t = hop(pool);
      t.handle.resume();
      t.handle.destroy();
    }
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/promise
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

`Reschedule` names no pool of its own. Complete the hook's signature so
it finds the pool through the awaiting coroutine's promise.

```cpp
#include <coroutine>
#include <deque>
struct Pool {
  std::deque<std::coroutine_handle<>> ready;
  void enqueue(std::coroutine_handle<> h) { ready.push_back(h); }
};
struct Reschedule {
  bool await_ready() const noexcept { return false; }
  {{c1::template <typename Promise> void await_suspend(std\::coroutine_handle<Promise> h) const}} {
    h.promise().pool->enqueue(h);
  }
  void await_resume() const noexcept {}
};
```

---

The compiler calls `await_suspend` with a `std::coroutine_handle<P>` for
the awaiting coroutine's own promise type, so a member template whose
parameter sits in that position deduces `P`, and `h.promise()` becomes
reachable. Naming `Task::promise_type` cannot work — `Task` is written
after the awaiter — and would serve one coroutine type only. The
awaiter stays context-free and serves every coroutine type whose
promise has a `pool` — the coroutine spelling of an *environment
query*, the idea `std::execution` standardises as
`get_scheduler(get_env(rcvr))`. `std::coroutine_handle<>` would accept
the handle too, but an erased handle has no `promise()`.
