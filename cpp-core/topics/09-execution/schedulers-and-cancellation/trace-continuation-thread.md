---
id: execution-trace-continuation-thread
kind: trace
version: 1
level: 4
tags: [execution, async, c++26, scheduling, tracing]
requires:
  - execution-starts-on-vs-continues-on
probes:
  1: { t1: "main" }
  2: { t2: "pool" }
  3: { t3: "pool" }
  4: { t4: "ui" }
  out: "15"
refs:
  - https://eel.is/c++draft/exec.continues.on
  - https://eel.is/c++draft/exec.then
  - https://eel.is/c++draft/exec.sync.wait
---

`pool` and `ui` are schedulers for two single-thread contexts, and
`where()` returns `"main"`, `"pool"` or `"ui"` for the thread calling
it. `main` runs this. Which thread runs each `then`?

```cpp
std::string t1, t2, t3, t4;
auto w = just(5)
       | then([&](int x) { t1 = where(); return x + 1; })  // @1
       | continues_on(pool)
       | then([&](int x) { t2 = where(); return x * 2; })  // @2
       | then([&](int x) { t3 = where(); return x; })      // @3
       | continues_on(ui)
       | then([&](int x) { t4 = where(); return x + 3; }); // @4
auto [r] = std::this_thread::sync_wait(std::move(w)).value();
std::cout << r;
```

---

A `then` runs where its predecessor completed. `just` completes inline
inside `start`, which `sync_wait` calls on `main`: `t1` is `main`.
`continues_on(pool)` moves the rest onto the pool, and `@3` stays
there because nothing moved it again; only `continues_on(ui)` makes
`@4` run on `ui`. `r` is `(5 + 1) * 2 + 3 = 15`, read on `main` after
`sync_wait` returns.

GCC 14 has no `std::execution`, so this Card is not compiled. The
values were produced by running this snippet against NVIDIA's `stdexec`
reference implementation (`stdexec::` in place of the `std::`
namespaces, two one-thread `exec::static_thread_pool`s as `pool` and
`ui`), compiled with GCC 16.2 (`g++ -std=c++23`).
