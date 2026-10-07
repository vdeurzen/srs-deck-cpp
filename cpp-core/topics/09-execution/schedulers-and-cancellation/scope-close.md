---
id: execution-scope-close
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.simple.counting.mem
  - https://eel.is/c++draft/exec.spawn
requires:
  - execution-counting-scope
---

## `spawn(work(), scope.get_token())` runs after `scope.close()`. What happens to `work()`?

---

**It is never started: the association fails, and the spawned state is
destroyed unstarted.**

`close()` makes every later `try_associate()` fail, while operations
already associated run on. So during shutdown `join()` waits only for
work that was in flight, and cannot be starved by new arrivals.
