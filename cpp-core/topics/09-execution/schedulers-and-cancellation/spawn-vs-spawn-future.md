---
id: execution-spawn-vs-spawn-future
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
requires:
  - execution-counting-scope
elaborate: Name a piece of work you would `spawn` and one you would `spawn_future`, and say what decides it.
refs:
  - https://eel.is/c++draft/exec.spawn
  - https://eel.is/c++draft/exec.spawn.future
  - https://wg21.link/p3149
---

`spawn(sndr, scope.get_token())` eagerly starts `sndr` in a state it
allocates, counted by the scope and freed by itself on completion; it
returns {{c1::void::a return type}}. Its receiver accepts only
{{c2::set_value() with no values, and set_stopped()::which
completions?}}. `spawn_future(sndr, token)` starts the same way but
returns {{c3::a sender::a return type}} that completes with the work's
value, error or stopped completion.

---

Because `spawn`'s receiver rejects errors, an unhandled failure is a
compile error at the call, not a lost exception. `spawn_future` pays for
a shared state the result waits in. The deciding question: does anyone
need the result? `spawn` allocates with the environment's allocator,
else the sender's, else `std::allocator`.
