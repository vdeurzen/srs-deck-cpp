---
id: chunks-raii-guard
kind: chunk
version: 1
level: 2
tags: [idioms, raii]
requires:
  - raii-copy-double-close
expose_ms: 9000
compile:
  harness: |
    #include <utility>
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/raii
---

```cpp
#include <functional>
struct ScopeGuard {
  explicit ScopeGuard(std::function<void()> f) : on_exit_(std::move(f)) {}
  ScopeGuard(const ScopeGuard&) = delete;
  ~ScopeGuard() { on_exit_(); }
  std::function<void()> on_exit_;
};
```

---

The scope guard: wrap an arbitrary cleanup callback in a type whose only
job is to run it in its destructor. Because destructors run on every exit
path — normal return, `break`, or an exception unwinding through — the
callback fires exactly once no matter how the enclosing scope is left,
without a single explicit `try`/`catch`.

The deleted copy constructor is load-bearing, not boilerplate. A copyable
guard runs the callback once *per copy*; and because a user-declared copy
constructor also suppresses the implicit move operations, no moved-from
guard can exist whose emptied `std::function` would throw
`bad_function_call` out of a destructor and terminate the program. One
guard, one callback, one run.
