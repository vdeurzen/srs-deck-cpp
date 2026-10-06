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
several values}}, failure is
`set_error(rcvr, err)` — where `err` is often but not always a
`std::exception_ptr` — and the third is
{{c3::set_stopped(rcvr)::"this work was cancelled and produced neither
a result nor an error"}}, which is what makes cancellation a normal,
typed outcome rather than an exception or a sentinel value.

All three completion functions — `set_value` included — are required
to be {{c4::noexcept::a completion has nowhere left to report its own
failure}}: an adaptor whose work can throw catches the exception itself
and reports it on `set_error`, which is why the error channel is usually
a pointer-sized type such as `exception_ptr`. The three together are what an adaptor must handle to be
correct: `then` transforms the value channel and passes the other two
through untouched.
