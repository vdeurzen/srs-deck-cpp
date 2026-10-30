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
A colleague who knows callbacks and `std::future` asks how a sender's
work actually gets run and delivers its result. Explain it to them.
---
- [ ] A sender only describes work; building one runs nothing and allocates nothing
- [ ] `connect(sender, receiver)` produces an operation state, and `start(op)` launches the work
- [ ] The receiver then gets exactly one completion, once: `set_value`, `set_error` or `set_stopped`
- [ ] Completions are `noexcept`, so work that throws catches the exception and reports it on `set_error`
- [ ] The operation state must stay alive and in place until the completion, which may arrive before `start` returns
