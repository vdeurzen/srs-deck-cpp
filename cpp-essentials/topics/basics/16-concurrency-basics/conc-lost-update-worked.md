---
id: conc-lost-update-worked
kind: basic
version: 1
level: 2
tags: [concurrency, threads, worked-example]
requires:
  - conc-thread-shares-memory
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://eel.is/c++draft/intro.races
---

Threads A and B each run `++count` once on a shared `int count = 2`.
The machine does `++count` as three steps: load (copy `count` into the
thread's own register), add 1, store back. One order the steps can take:

| step | `regA` | `regB` | `count` |
| --- | --- | --- | --- |
| 1: A loads | 2 | – | 2 |
| 2: B loads | 2 | 2 | 2 |
| 3: A adds, stores | 3 | 2 | 3 |
| 4: B adds, stores | 3 | 3 | 3 |

## Why does B store 3, not 4, at step 4?

---

**B loaded `count` at step 2, before A stored; it adds to that stale 2.**

B's register still holds the old value, so B computes 3 and its store
overwrites A's 3 with another 3. Two increments ran, but `count` rose by
one: a *lost update*. It happens whenever one thread loads between
another's load and store.
