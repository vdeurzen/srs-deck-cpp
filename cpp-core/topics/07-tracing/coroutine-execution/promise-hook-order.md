---
id: trace-coroutine-hook-order
kind: trace
version: 1
level: 4
tags: [tracing, coroutines]
requires:
  - coroutines-done-and-destroy-preconditions
probes:
  1: { hooks: "GI" }
  2: { hooks: "GIBRF" }
  3: { hooks: "GIBRF", finished: "true" }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

```cpp
std::string hooks;   // every hook appends one letter

struct Task {
  struct promise_type {
    Task get_return_object() { hooks += 'G'; return Task{Handle::from_promise(*this)}; }
    std::suspend_always initial_suspend() noexcept { hooks += 'I'; return {}; }
    std::suspend_always final_suspend() noexcept { hooks += 'F'; return {}; }
    void return_void() { hooks += 'R'; }
    void unhandled_exception() {}
  };
  using Handle = std::coroutine_handle<promise_type>;
  Handle handle;
};

Task run() { hooks += 'B'; co_return; }

int main() {
  Task t = run();                         // @1
  t.handle.resume();                      // @2
  const bool finished = t.handle.done();  // @3
  t.handle.destroy();
}
```

---

Calling `run()` does everything except the body: the frame is
allocated, the promise constructed, `get_return_object()` runs (`G`),
and then `initial_suspend()` (`I`) suspends before the first statement.
The caller is holding a `Task` whose coroutine has not started.

`resume()` runs the body (`B`), then `co_return;` calls `return_void()`
(`R`), then `final_suspend()` (`F`) suspends again — which is what
keeps the frame alive afterwards, so `done()` can be asked and answers
`true`. Had `final_suspend()` returned `suspend_never`, the frame would
already be gone at `// @3` and both `done()` and `destroy()` would be
use-after-free.

The two suspensions at the ends are the ones you never write: the body
contains a single statement, and four of the five letters come from the
protocol around it. Verified by compiling and running this program
under GCC 13.3 and again under GCC 16.2 (`g++ -std=c++23`), printing
`hooks` at each Probe; the values are identical.
