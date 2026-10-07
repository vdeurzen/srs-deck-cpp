---
id: execution-bulk-vs-for-each-par
kind: basic
version: 2
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/for_each
  - https://eel.is/c++draft/algorithms.parallel.exceptions
  - https://eel.is/c++draft/exec.bulk
requires:
  - execution-bulk
---

## `f` throws on one index. What happens under `std::for_each(std::execution::par, first, last, f)`, and under `bulk(sndr, par, n, f)`?

---

**`for_each` calls `std::terminate`; `bulk` completes on `set_error`
with the exception.**

A parallel algorithm has no channel to report an escaping exception, so
the policy terminates. `bulk` is a sender, so the failure is an
ordinary completion that a later `upon_error` or `sync_wait` handles.
