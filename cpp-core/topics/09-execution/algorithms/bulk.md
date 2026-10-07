---
id: execution-bulk
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.bulk
  - https://wg21.link/p3481
requires:
  - execution-just-and-then
---

## What does the sender `bulk(sndr, policy, shape, f)` do once `sndr` completes with values `vals...`?

---

**Calls `f(i, vals...)` for every `i` in `[0, shape)`, then completes
with `vals...` unchanged.**

It is a parallel-for over shared data, not a producer of new values.
If `f` throws, the operation completes on `set_error`, and only some
of the indices may have run. `bulk_chunked` hands `f` sub-ranges
`[b, e)` instead.
