---
id: coroutines-scheduling-promise-arguments
kind: code
version: 1
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-return-object-timing
input: chips
choices:
  c1: ["Pool& owner", "Pool* owner", "Pool owner", "const Pool& owner"]
compile:
  harness: |
    struct Task;
    struct Hooks {
      Task get_return_object();
      std::suspend_never initial_suspend() noexcept { return {}; }
      std::suspend_never final_suspend() noexcept { return {}; }
      void return_void() {}
      void unhandled_exception() {}
    };
    struct Task { using promise_type = TaskPromise<Hooks>; };
    Task Hooks::get_return_object() { return {}; }
    Task batched(Pool& pool, int n) {
      (void)pool;
      (void)n;
      co_return;
    }
    int main() {
      Pool pool;
      batched(pool, 3);
    }
elaborate: For a coroutine that is a member function, what would the promise constructor's first parameter be, and why?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

The coroutine is declared `Task batched(Pool& pool, int n)`, and
`TaskPromise` is its promise type; its base `Hooks` supplies the other
required promise members. Complete the promise constructor so the
promise receives that same `Pool`, without a global anywhere.

```cpp
#include <coroutine>
struct Pool { Pool() = default; Pool(const Pool&) = delete; };
template <typename Hooks>
struct TaskPromise : Hooks {
  Pool* pool;
  explicit TaskPromise({{c1::Pool& owner}}, int) : pool(&owner) {}
};
```

---

This is the quiet hook that makes global-free scheduling ergonomic: if
the promise has a constructor callable with **the coroutine's own
arguments**, the compiler uses it, passing lvalues referring to the
copies in the frame. Otherwise it default-constructs the promise. So a
coroutine declared `Task batched(Pool& pool, int n)` hands its `Pool&`
to `TaskPromise(Pool&, int)` — the parameter types must match what the
call provides, which is why `Pool*` and a by-value `Pool` (the type is
non-copyable, as a pool should be) do not compile.

The payoff is that the *body* never mentions the pool again. Everything
the coroutine machinery needs — where to resume, which stop token
applies, which allocator to use — is reachable from
`handle.promise()`, and callers just pass the context as an ordinary
first argument.

For a coroutine that is a member function, the object itself is passed
first, so the promise constructor's first parameter is the implicit
object argument: `promise_type(Server&, int)` for
`Task Server::handle(int)`.
