---
id: execution-three-channels
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

Where a callback has one way to report back and a `std::future` has
two, a receiver has three completion channels, and an operation signals
exactly {{c1::one of them, exactly once::the fundamental contract every
sender and every adaptor must uphold}}. Success is
{{c2::set_value(rcvr, vals...)::the only channel that may carry
several values, and the only one allowed to throw}}, failure is
`set_error(rcvr, err)` — where `err` is often but not always a
`std::exception_ptr` — and the third is
{{c3::set_stopped(rcvr)::"this work was cancelled and produced neither
a result nor an error"}}, which is what makes cancellation a normal,
typed outcome rather than an exception or a sentinel value.

`set_error` and `set_stopped` are required to be
{{c4::noexcept::there is nowhere left to report a failure of the
failure path}}, which is why the error channel is usually a pointer-
sized type. The three together are what an adaptor must handle to be
correct: `then` transforms the value channel and passes the other two
through untouched.
