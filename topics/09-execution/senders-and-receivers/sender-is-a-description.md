---
id: execution-sender-is-a-description
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## What is a *sender*, and what has happened by the time `auto s = just(42) | then(f);` returns?

---

A sender is a **description of work**, not work in progress. It is a
value — usually a small, trivially-copyable aggregate of the pieces it
was built from — that knows what should happen and on what, but has no
thread, no allocation and no shared state behind it.

By the time that line returns, nothing has run. `f` has not been
called, `42` has not been produced, and no execution context has been
told anything. `s` is a compile-time tree describing "produce 42, then
apply `f`", and it will stay inert until someone `connect`s a receiver
to it and `start`s the resulting operation state.

That laziness is the whole design. Because the sender is inert, the
composition is a pure type-level construction: adaptors can fuse,
the full shape of the work is known to the compiler, and the storage
for the whole chain can be allocated once, in one object, rather than
node by node as an eager chain of callbacks would. It also means the
question "where does this run?" still has an answer at composition
time — the caller decides, by choosing the scheduler it is started on,
rather than the sender deciding by having already started.

The three vocabulary types fit together like this: a **sender** says
what; a **receiver** says where results go; `connect` pairs them into
an **operation state**, and `start` sets it running.
