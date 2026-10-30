---
id: parsons-schedule-on-pool
kind: parsons
version: 2
level: 4
tags: [idioms, coroutines, scheduling]
requires:
  - coroutines-scheduling-schedule-awaiter
distractors:
  - "std::coroutine_handle<> await_suspend(std::coroutine_handle<> h) const { return h; }"
  - "constexpr bool await_ready() const noexcept { return true; }"
compile:
  harness: |
    #include <deque>
    #include <type_traits>
    std::deque<std::coroutine_handle<>> ready_queue;
    void Pool::enqueue(std::coroutine_handle<> h) { ready_queue.push_back(h); }
    inline Pool gp;
    static_assert(!ScheduleOn{gp}.await_ready());
    static_assert(std::is_void_v<decltype(ScheduleOn{gp}.await_suspend({}))>);
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
    }
elaborate: What would you change in this awaiter so that a coroutine already running on the pool does not pay for a hand-off?
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

`Pool::enqueue`, defined elsewhere, pushes a handle onto the pool's
ready queue, which a worker loop drains by resuming each handle. Order
the lines of `ScheduleOn`, the awaiter after which the rest of a
coroutine runs from the pool instead of here.

```cpp
#include <coroutine>
struct Pool { void enqueue(std::coroutine_handle<> h); };
struct ScheduleOn {
  Pool& pool;
  constexpr bool await_ready() const noexcept { return false; }
  void await_suspend(std::coroutine_handle<> h) const { pool.enqueue(h); }
  void await_resume() const noexcept {}
};
```

---

**A never-ready awaiter whose `void` `await_suspend` publishes the
handle.** `co_await ScheduleOn{pool};` means "everything after this line
runs from the pool's worker loop rather than here". The three hooks may
be declared in any order.

Two tempting wrong turns: an `await_ready()` that
returns `true` skips the hand-off, so the coroutine never reaches the
pool. An `await_suspend` that returns the handle it was given uses
symmetric transfer to resume the same coroutine at once, the opposite of
scheduling (a `void` `await_suspend` that calls `h.resume()` has the same
flaw, and nests one `resume()` inside another).
