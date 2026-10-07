---
id: execution-stopped-channel
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.get.stop.token
  - https://eel.is/c++draft/exec.set.stopped
  - https://en.cppreference.com/w/cpp/thread/stop_token
requires:
  - execution-environment-queries
---

## How does cancellation travel through a sender chain?

---

**Down as a request through the environment's stop token; back up as a
`set_stopped` completion.**

An interruptible operation asks `get_stop_token(get_env(rcvr))` when it
starts and registers a stop callback on it. When it gives up, it
completes with `set_stopped`, and everything downstream sees a
*stopped* result rather than an exception.
