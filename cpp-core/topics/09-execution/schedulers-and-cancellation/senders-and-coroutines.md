---
id: execution-senders-and-coroutines
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## How do senders and coroutines fit together, and which one should a given piece of code be?

---

They are two spellings of one model, and P2300 makes the bridge
explicit. `as_awaitable(sndr, promise)` turns a sender into something
awaitable, and a promise type that inherits from
`with_awaitable_senders<Promise>` gets an `await_transform` that
applies it to everything — so inside such a coroutine,
`co_await schedule(pool)` and `co_await when_all(a, b)` just work. The
three channels map onto the three things a `co_await` can do: a value
completion becomes the expression's result, an error completion throws
at the resume point, and a stopped completion transfers to the
promise's `unhandled_stopped()`.

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
