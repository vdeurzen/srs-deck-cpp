---
id: trace-awaiter-hook-order
kind: trace
version: 1
level: 4
tags: [tracing, coroutines]
requires:
  - trace-awaiter-hook-order-worked
  - coroutines-await-suspend-return-types
elaborate: Say aloud why an awaiter whose result is often already available should answer `true` from `await_ready()` rather than resuming itself from `await_suspend`.
probes:
  1: { hooks: "RVRS" }
  2: { hooks: "RVRSVE", "t.handle.done()": "true" }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

Each hook appends one letter to the global `std::string hooks`. `Task`
starts eagerly (`initial_suspend()` returns `suspend_never`), suspends
at `final_suspend()`, keeps its coroutine handle in `t.handle`, and its
destructor destroys the frame.

```cpp
struct Step {
  bool ready;
  bool await_ready() const { hooks += 'R'; return ready; }
  void await_suspend(std::coroutine_handle<>) const { hooks += 'S'; }
  void await_resume() const { hooks += 'V'; }
};

Task demo() {
  co_await Step{true};
  co_await Step{false};
  hooks += 'E';
}

int main() {
  Task t = demo();       // @1
  t.handle.resume();     // @2
}
```

---

The first `co_await` asks `await_ready()` (`R`), gets `true`, and skips
suspension entirely — `await_suspend` is never called, so the next
letter is `await_resume`'s `V`. That is the fast path every awaitable
should have: no state saved, no scheduler touched, `co_await` collapsing
to a function call.

The second `co_await` asks (`R`), gets `false`, and so suspends
(`S`). `await_suspend` returning `void` means control goes back to
whoever was running the coroutine — here the caller of `demo()`, which
is why `RVRS` is all that has happened when `main` reaches `// @1`
even though the coroutine started eagerly.

`resume()` picks up inside the second `co_await`: `await_resume` (`V`)
produces its value, the body finishes (`E`), and the coroutine suspends
at `final_suspend`, so `done()` is `true`. Note the asymmetry worth
remembering: `await_ready` runs once per `co_await`, `await_suspend`
only when it returns false, and `await_resume` always. Verified by
compiling and running this program under GCC 13.3 and again under
GCC 16.2 (`g++ -std=c++23`); the values are identical.
