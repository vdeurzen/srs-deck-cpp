---
id: parsons-schedule-on-pool
kind: parsons
version: 1
level: 4
tags: [idioms, coroutines, scheduling]
distractors:
  - "void await_suspend(std::coroutine_handle<> h) const { h.resume(); }"
  - "bool await_ready() const noexcept { return true; }"
  - "void enqueue(std::coroutine_handle<> h) { h.destroy(); }"
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
    Task job(Pool& pool, int& done) {
      co_await ScheduleOn{pool};
      done = 1;
    }
    int main() {
      Pool pool;
      int done = 0;
      job(pool, done);
      pool.run();
      return done == 1 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

```cpp
#include <coroutine>
#include <deque>
struct Pool {
  std::deque<std::coroutine_handle<>> ready;
  void enqueue(std::coroutine_handle<> h) { ready.push_back(h); }
  void run() {
    while (!ready.empty()) {
      const auto h = ready.front();
      ready.pop_front();
      h.resume();
    }
  }
};
struct ScheduleOn {
  Pool& pool;
  bool await_ready() const noexcept { return false; }
  void await_suspend(std::coroutine_handle<> h) const { pool.enqueue(h); }
  void await_resume() const noexcept {}
};
```

---

The smallest complete scheduler: a queue of type-erased handles, a loop
that resumes them, and an awaiter that puts the current coroutine into
the queue instead of resuming it. `co_await ScheduleOn{pool};` inside
any coroutine means "everything after this line runs from `pool.run()`
rather than here".

The Distractors are the two tempting wrong turns. `h.resume()` inside
`await_suspend` compiles and appears to work, but it runs the
continuation on the suspending thread and nests one `resume()` inside
another — the opposite of scheduling. An `await_ready()` that returns
`true` skips the hand-off altogether, so the coroutine never reaches
the pool at all.

Replace the `std::deque` with a lock-free intrusive list whose nodes
live in the awaiters, and give `run()` to several `std::jthread`s, and
this is the core of a real thread-pool scheduler — nothing else about
the shape changes.
