---
id: coroutines-return-object-delivery
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-return-object-timing
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
  - https://eel.is/c++draft/dcl.fct.def.coroutine
---

## `get_return_object()` has run and its result is sitting in the frame. When does the *caller* actually receive that object?

---

**When the coroutine first suspends — or completes, if it never
suspends.** A lazy start suspends at `initial_suspend()`, so the caller
holds the object before any body statement has run. Either way it is
computed before the body (only its conversion to the declared return
type may be deferred, CWG2563), so nothing the body does can shape it.
