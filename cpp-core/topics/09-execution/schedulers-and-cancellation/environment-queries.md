---
id: execution-environment-queries
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26, scheduling]
refs:
  - https://eel.is/c++draft/exec.get.env
  - https://eel.is/c++draft/exec.fwd.env
  - https://wg21.link/p2300
requires:
  - execution-connect-and-start
---

With no global runtime, an operation finds its scheduler, allocator and
stop token in the **environment**: a bag of queries hanging off the
receiver, retrieved with {{c1::get_env(rcvr)::a customisation point on
the receiver}} and asked with named queries such as `get_stop_token`,
`get_allocator` and `get_scheduler`. Because the receiver is supplied
by the *consumer* and passed down at `connect` time, the dependency
flows {{c2::from the outside in::who decides what the work gets?}},
never from a global.

An adaptor that does not answer a query itself will
{{c3::forward it to its own receiver::where does the question go
next?}}, but only if the query is a `forwarding_query`, which is how a
stop token injected at the top reaches every leaf. The receiver's
environment is to a sender what the promise is to a coroutine: the
place the surrounding context hangs.
