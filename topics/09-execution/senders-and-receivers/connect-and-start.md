---
id: execution-connect-and-start
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## What does `connect(sndr, rcvr)` produce, and what is the division of labour between it and `start`?

---

`connect` performs the **setup**: it takes a sender and a receiver and
returns an *operation state* — one object holding everything the work
needs for its whole lifetime. Sub-operations of a composed sender are
stored *inside* it, nested, so a whole pipeline is one object whose
size is known at compile time. `connect` may allocate if some adaptor
in the chain needs to, but the vocabulary does not require it to.

`start(op)` performs the **launch**, and it is `noexcept`. It may only
be called once, and from that moment the operation is running: exactly
one completion function will eventually be invoked on the receiver,
possibly on another thread, possibly before `start` itself returns.

Splitting the two is what makes the model allocation-free and
structured. The caller owns the storage, so it can put a whole
asynchronous pipeline in a stack frame, in a member, or in a parent's
operation state, and the operation cannot outlive it by accident.
Compare a `std::future`-based chain, where each link necessarily has
its own heap-allocated shared state because nobody can say in advance
where the result should live.

In practice you rarely write either call: `sync_wait` and the async
scope facilities do it for you. Knowing the pair exists is what makes
the error messages, and the lifetime rules below, make sense.
