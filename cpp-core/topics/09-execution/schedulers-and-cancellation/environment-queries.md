---
id: execution-environment-queries
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26, scheduling]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
requires:
  - execution-connect-and-start
---

The answer to "where does an operation find its scheduler, its
allocator and its stop token, if there is no global runtime?" is the
**environment**: a bag of queries hanging off the receiver, retrieved
with {{c1::get_env(rcvr)::every receiver has one; senders have one
too, describing where they will complete}} and asked with named
queries such as `get_stop_token`, `get_allocator` and
`get_scheduler`. Because the receiver is supplied by the *consumer*
and passed down at `connect` time, the dependency flows
{{c2::from the outside in::the caller decides what the work gets,
exactly as passing a scheduler argument would — only without touching
every signature}}, never from a global.

Adaptors that do not answer a query themselves
{{c3::forward it to their own receiver::which is why a token injected
at the top reaches every leaf of the chain}}, so the environment
behaves like dynamic scope over a statically-known tree. A query
marked as a {{c4::forwarding_query::the opt-in that says "this one
should propagate through adaptors"}} takes part in that automatically.

This is the same design as a coroutine promise that an awaiter reads
through `h.promise()` — the receiver is to a sender what the promise is
to a coroutine: the place the surrounding context hangs, so nothing has
to be looked up.
