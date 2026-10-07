---
id: execution-three-channels
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.recv
  - https://eel.is/c++draft/exec.set.value
  - https://wg21.link/p2300
requires:
  - execution-sender-is-a-description
---

Where a callback has one way to report back and a `std::future` has
two, a receiver has three completion channels, and an operation signals
exactly {{c1::one of them, exactly once::how many, and how often}}.
Success is {{c2::set_value(rcvr, vals...)::the only channel that may
carry several values}}, failure is `set_error(rcvr, err)` — where `err`
is often but not always a `std::exception_ptr` — and the third is
{{c3::set_stopped(rcvr)::a completion function}}, "neither a result
nor an error", which makes cancellation a normal, typed outcome rather than
an exception or a sentinel value.

An adaptor such as `then` transforms one channel and passes the other
two through untouched.
