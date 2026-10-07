---
id: execution-counting-scope
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
requires:
  - execution-operation-state-lifetime
  - threads-thread-destructor-joinable
refs:
  - https://eel.is/c++draft/exec.counting.scopes
  - https://eel.is/c++draft/exec.simple.counting.ctor
  - https://wg21.link/p3149
---

## Work was `spawn`ed into a `std::execution::counting_scope` (C++26, P3149) and the scope is destroyed before its `join()` has completed. What happens?

---

**`std::terminate`.**

The scope counts one *association* per spawned operation, and its
destructor is legal only once joined (or never used): like
`std::thread`, it refuses to guess. `join()` is a sender completing
when the count reaches zero.

```cpp
counting_scope scope;
spawn(work(), scope.get_token());   // detached, but counted
sync_wait(scope.join());            // waits for it; now ~scope is fine
```
