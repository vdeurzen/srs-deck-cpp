---
id: execution-senders-are-not-futures
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, misconception]
elaborate: Where in your own code does a std::future or a callback chain start work before anyone has said where it should run, or allocate a shared state you never needed? What would owning that storage instead look like?
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://en.cppreference.com/w/cpp/thread/future
  - https://wg21.link/p2300
requires:
  - execution-sender-is-a-description
---

## "A sender is basically `std::future` with a working `.then()`." What does this miss?

---

Four things, and each one is a design decision rather than an
accident.

**Eagerness.** A `std::future` refers to work that is *already
running*; a sender describes work that has not started. So a sender
can still be given a scheduler, wrapped, retried, or thrown away
unstarted — a future can only be waited on.

**Allocation.** A future's shared state is heap-allocated and
reference-counted because the producer and consumer are separate and
neither owns the other. A sender chain is `connect`ed into a single
operation state whose type and size the compiler knows, which the
caller places wherever it likes — typically a stack frame. Composing
ten adaptors allocates nothing.

**Cancellation.** There is no way to tell a `std::future`'s work to
stop. Senders make it a first-class channel: `set_stopped`, with the
stop token reaching the operation through the receiver's environment.

**Where it runs.** `.then()` on a future says nothing about the
execution context of the continuation. Senders make it explicit —
`starts_on` and `continues_on` name a scheduler, and
`get_completion_scheduler` lets an adaptor ask where its predecessor
will finish.

The honest summary: `future` is a *handle to a running operation*,
while a sender is a *recipe* — and almost everything else follows from
that one difference.
