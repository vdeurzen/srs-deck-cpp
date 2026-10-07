---
id: execution-split-multi-shot
kind: basic
version: 2
level: 5
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.connect
  - https://eel.is/c++draft/exec.just
  - https://wg21.link/p2300
requires:
  - execution-connect-and-start
---

## `auto s = just(42);` can be passed to `sync_wait(s)` twice. Why does the same fail to compile for `auto s = just(std::make_unique<int>(1));`?

---

**Connecting an lvalue sender copies it, and a `unique_ptr` cannot be
copied.**

`just(42)` is copyable, so each `connect` gets its own copy. A sender
owning move-only contents is *single-shot*: it connects only as an
rvalue, `sync_wait(std::move(s))`, and is consumed by that.
