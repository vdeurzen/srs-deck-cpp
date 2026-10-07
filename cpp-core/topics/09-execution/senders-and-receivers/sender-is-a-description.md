---
id: execution-sender-is-a-description
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
requires:
  - lambda-closure-type
refs:
  - https://eel.is/c++draft/exec.snd.general
  - https://eel.is/c++draft/exec.async.ops
  - https://wg21.link/p2300
---

## In C++26 `std::execution`, what has happened by the time `auto s = just(42) | then(f);` returns?

---

**Nothing has run: `s` is a description of work, a *sender*.**

`f` has not been called, `42` has not been produced, no execution
context has been told anything and nothing was allocated. `s` is a
small, cheaply movable value that stays inert until a receiver is
`connect`ed to it and the result is `start`ed.
