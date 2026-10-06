---
id: execution-spawn-vs-spawn-future
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
requires:
  - execution-counting-scope
refs:
  - https://eel.is/c++draft/exec.spawn
  - https://eel.is/c++draft/exec.spawn.future
  - https://wg21.link/p3149
---

`spawn(sndr, scope.get_token())` eagerly starts `sndr` in a state it
allocates (with the environment's allocator, else the sender's, else
`std::allocator`), associated with the scope — which counts it — and
freed by the state itself on completion; it returns
{{c1::void::nothing to wait on — the scope's join is the only way to
learn it finished}}. Its receiver accepts only
{{c2::set_value() with no values, and set_stopped()::a sender that can
complete with values or an error does not connect — handle errors
first, with upon_error or let_error}}, so an unhandled failure is a
compile error at the call, not a lost exception.

`spawn_future(sndr, token)` starts the same way but returns
{{c3::a sender::connect it later to receive the result; destroying it
unconnected requests stop on the spawned work}} that completes with the
eagerly-started work's value, error or stopped completion — at the cost
of a shared state the result waits in. The deciding question: does
anyone need the result?
