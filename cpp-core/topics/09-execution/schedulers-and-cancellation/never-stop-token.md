---
id: execution-never-stop-token
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.get.stop.token
  - https://en.cppreference.com/w/cpp/thread/never_stop_token
requires:
  - execution-stopped-channel
  - coroutines-scheduling-stop-token-plumbing
---

## The consumer's environment offers no stop token. What does an operation's stop-callback registration then cost?

---

**Nothing: it gets a `never_stop_token`, and the registration compiles
away.**

`get_stop_token` falls back to `never_stop_token`, whose
`stop_possible()` is `constexpr false`; it models `unstoppable_token`.
Generic code tests that concept and skips the callback at compile
time, so cancellation support is free where nobody can cancel.
