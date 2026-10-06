---
id: execution-counting-scope
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
requires:
  - execution-operation-state-lifetime
refs:
  - https://eel.is/c++draft/exec.scope
  - https://wg21.link/p3149
  - https://en.cppreference.com/w/cpp/execution
---

## Work was `spawn`ed into a `std::execution::counting_scope` (C++26, P3149) and the scope is destroyed before its `join()` has completed. What happens?

---

**`std::terminate`.**

A scope counts *associations*, one per operation spawned through its
token, and its destructor is legal only in the *joined* state (or a
scope never used). `join()` is itself a sender — `co_await scope.join()`
or `sync_wait(scope.join())` — completing once the count reaches zero;
`close()` first refuses new associations. So spawned work cannot
outlive the state it borrows.

```cpp
counting_scope scope;
spawn(work(), scope.get_token());   // detached, but counted
sync_wait(scope.join());            // waits for it; now ~scope is fine
```
