---
id: err-assert-vanishes-ndebug
kind: basic
version: 1
level: 1
tags: [assert, error-handling]
refs:
  - https://en.cppreference.com/w/cpp/error/assert
---

## `assert(cfg.is_open());` checks that a config file the user may have deleted was opened. The debug build stops on a missing file; the release build carries on as if it were there. Why?

---

**Release builds define `NDEBUG`, and then `assert(...)` expands to
nothing.** The check is gone, not just quiet. So `assert` states what a
correct program can never violate (a bug); a missing file can happen in a
correct program and needs an error the release build still reports.
