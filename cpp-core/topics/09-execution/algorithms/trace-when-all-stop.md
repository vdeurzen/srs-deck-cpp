---
id: execution-trace-when-all-stop
kind: trace
version: 2
level: 4
tags: [execution, async, c++26, tracing]
requires:
  - execution-trace-when-all-stop-worked
  - execution-stop-still-completes
elaborate: Say in one sentence, as to an interviewer, what a child of `when_all` must do itself if a stop request should actually save work.
probes:
  1: { ran_c: "true", saw_stop: "true" }
refs:
  - https://eel.is/c++draft/exec.when.all
  - https://eel.is/c++draft/exec.read.env
  - https://eel.is/c++draft/exec.sync.wait
---

Both children complete inline, in the order `when_all` starts
them. Fill in the variables at `@1`.

```cpp
bool ran_c = false, saw_stop = false;
auto b = just() | then([]() -> int { throw std::runtime_error("b"); });
auto c = read_env(get_stop_token)   // sender of the env's stop token
       | then([&](auto tok) { ran_c = true;
                              saw_stop = tok.stop_requested(); return 2; });
try {
  std::this_thread::sync_wait(when_all(b, c));
} catch (const std::runtime_error&) {}
// @1
```

---

`when_all` starts its children left to right (`(start(ops), ...)` in
[exec.when.all]). `b` throws, so `then` completes it on `set_error`, and
`when_all` fires its own stop source. `c` starts afterwards, and its
token already says `stop_requested()`, but a stop is only a *request*:
`then` never checks it, so `c`'s lambda still runs and records that it
saw the request.

GCC 14 has no `std::execution`, so this Card is not compiled. The
values were produced by running this snippet against NVIDIA's `stdexec`
reference implementation (`stdexec::` in place of the `std::`
namespaces), compiled with GCC 16.2
(`g++ -std=c++23`), with a clean `-fsanitize=address,undefined` run.
