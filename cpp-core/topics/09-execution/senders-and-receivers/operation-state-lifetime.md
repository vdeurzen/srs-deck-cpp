---
id: execution-operation-state-lifetime
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, lifetimes]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
requires:
  - execution-connect-and-start
---

## Why is an operation state neither copyable nor movable, and how long must it live?

---

Because the running operation points into it. An I/O operation may
have handed the kernel the address of a buffer that lives in the
operation state; a nested child operation is stored inside its parent's
one and holds a receiver that refers back to it; a stop callback is
registered with a pointer to it. Moving the object would leave every
one of those pointers behind, and there is no moment at which a
half-started asynchronous operation could be safely relocated — so the
type simply forbids it.

The lifetime rule follows: the operation state must remain alive from
`start` until the receiver's completion function has been invoked.
Destroying it earlier is a use-after-free of exactly the kind
`destroy()`-ing a coroutine with an in-flight `io_uring` read is.

This is why the model is described as *structured*. Composition nests
operation states rather than chaining independently-allocated nodes:
`sync_wait` puts the root one on the calling thread's stack and blocks
until completion, and an async scope keeps one alive for work that
must outlive its creating expression. The rule to carry around: **the
operation state is the async equivalent of a stack frame** — same
nesting, same ownership, same discipline, just not on any one thread's
stack.
