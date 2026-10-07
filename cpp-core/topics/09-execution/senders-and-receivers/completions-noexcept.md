---
id: execution-completions-noexcept
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.set.value
  - https://eel.is/c++draft/exec.general
requires:
  - execution-three-channels
---

## `set_value`, `set_error` and `set_stopped` are all required to be `noexcept`. Why may even `set_value` not throw?

---

**A completion is the last report; there is nowhere left to send its
own failure.**

The draft wraps each call in *MANDATE-NOTHROW*. So work that can throw
catches the exception itself and reports it on `set_error`, usually as
an `exception_ptr`: `then(f)` does exactly that when `f` throws.
