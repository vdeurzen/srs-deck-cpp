---
id: execution-senders-and-coroutines
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
requires:
  - coroutines-await-transform-hook
  - execution-connect-and-start
  - execution-as-awaitable-channels
---

## How do senders and coroutines fit together, and which one should a given piece of code be?

---

They are two spellings of one model, and P2300's `as_awaitable` /
`with_awaitable_senders` bridge means `co_await schedule(pool)` and
`co_await when_all(a, b)` just work inside such a coroutine.

The correspondence runs all the way down. A sender is a coroutine that
has not been called; an operation state is a coroutine frame; `connect`
is creating the frame and `start` is the first `resume()`; a receiver
is the continuation plus its environment, and the environment is the
promise.

Which to write is an engineering trade, not a philosophy:

- **Coroutines** win on readability whenever the logic has loops,
  branches, or locals that span suspensions — the code looks
  sequential because it is.
- **Senders** win where every allocation counts, because a sender
  chain's storage is one statically-sized operation state, while each
  coroutine is a frame the compiler is only sometimes able to elide.
  They are also the composable vocabulary: `when_all`, `bulk` and
  `let_value` are algorithms over senders, not over coroutines.

A healthy codebase does both: coroutines for the business logic,
senders for the plumbing that starts, joins and cancels it.
