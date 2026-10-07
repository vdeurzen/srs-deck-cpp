---
id: execution-sync-wait
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.sync.wait
  - https://wg21.link/p2300
requires:
  - execution-connect-and-start
  - execution-just-and-then
---

## What does `std::this_thread::sync_wait(sndr)` return for each of the three completion channels?

---

**`std::optional<std::tuple<Vals...>>`: engaged on `set_value`,
`nullopt` on `set_stopped`; `set_error` is thrown.**

An `exception_ptr` is rethrown, an `error_code` becomes
`system_error`, any other error is thrown as itself. Because the
result is one `tuple`, `sndr` must have exactly one value completion
signature (`sync_wait_with_variant` handles more).
