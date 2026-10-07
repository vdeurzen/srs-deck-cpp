---
id: execution-chunk-scope-spawn-join
kind: chunk
version: 1
level: 4
tags: [execution, async, c++26, concurrency, idioms]
requires:
  - execution-spawn-vs-spawn-future
  - execution-scope-close
expose_ms: 9000
compile: null
refs:
  - https://eel.is/c++draft/exec.spawn
  - https://eel.is/c++draft/exec.counting.scopes
  - https://eel.is/c++draft/exec.then
---

```cpp
counting_scope scope;
for (auto& req : requests)
  spawn(handle(req) | upon_error(log_error), scope.get_token());
scope.close();
sync_wait(scope.join());
```

---

Fan out detached work, then shut down cleanly. The scope outlives
every spawn; `upon_error` turns failures into `set_value()`, because
`spawn` rejects a sender that can complete with an error — and
`log_error` must be `noexcept`, or `upon_error` itself could still
fail. `close()` stops new associations, and `join()` waits for the
count to reach zero, so `~scope` is legal. `handle(req)` must complete
with no values.

GCC 14 has no `std::execution`, so this snippet is graded by text
(`compile: null`). It was checked against NVIDIA's `stdexec` with
GCC 16.2: it runs, and dropping `upon_error`, or the `noexcept` on
`log_error`, fails `spawn`'s "cannot fail" static assertion.
