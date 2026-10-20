---
id: execution-trace-continuation-thread-worked
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, scheduling, worked-example]
requires:
  - execution-starts-on-vs-continues-on
refs:
  - https://eel.is/c++draft/exec.continues.on
  - https://eel.is/c++draft/exec.then
  - https://eel.is/c++draft/exec.sync.wait
---

`pool` is a scheduler for a single-thread context. `main` runs this.

```cpp
auto w = just(1)
       | then([](int x) { return x + 1; })   // A
       | continues_on(pool)
       | then([](int x) { return x * 2; });  // B
std::this_thread::sync_wait(std::move(w));
```

| step | what happens | thread |
| --- | --- | --- |
| 1 | `sync_wait` starts the chain | main |
| 2 | `just(1)` completes inline | main |
| 3 | `A` runs | main |
| 4 | `continues_on(pool)` completes on pool | pool |
| 5 | `B` runs | pool |

## At step 3, `A` runs on `main` though no adaptor names `main`. Why?

---

**A `then` runs where its predecessor completed, and `just` completed inline on `main`.**

`sync_wait` calls `start` on the calling thread, and `just(1)` completes
right there inside `start`. So `A` inherits `main`; only an explicit hop
such as `continues_on` changes the thread for what follows.
