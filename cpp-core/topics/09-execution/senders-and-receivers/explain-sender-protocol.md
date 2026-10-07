---
id: execution-explain-sender-protocol
kind: explain
version: 1
level: 5
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.async.ops
  - https://eel.is/c++draft/exec.connect
  - https://wg21.link/p2300
requires:
  - execution-completions-noexcept
  - execution-start-may-complete-inline
  - execution-op-state-destroyed-early
---
Explain the sender/receiver protocol to a colleague who knows callbacks
and `std::future`: the three roles, the two calls, and the one object
they produce.
---
- [ ] A **sender** describes work that has not started; building one runs nothing and allocates nothing
- [ ] A **receiver** is where the result goes, with three channels, `set_value`, `set_error`, `set_stopped`; exactly one is signalled, exactly once
- [ ] All three completion functions are `noexcept`, so work that throws catches and reports on `set_error`
- [ ] `connect(sndr, rcvr)` yields an **operation state**; `start(op)` launches it once, is `noexcept`, and the completion may arrive before it returns
- [ ] The operation state is never copied or moved (ill-formed for library senders), nests its children, and must live until a completion is delivered: one object the caller places, like an async stack frame
