---
id: coroutines-frame-allocation
kind: basic
version: 1
level: 4
tags: [coroutines, performance]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://wg21.link/p0981
---

## What lives in a coroutine frame, where is it allocated, and when can that allocation disappear?

---

The frame holds everything that has to survive a suspension: the
`promise_type` object, the copied parameters, every local whose lifetime
crosses a suspension point, the current temporary awaiter, and the
bookkeeping the state machine needs (where to resume, and pointers to
the resume and destroy functions). Locals that never cross a suspension
point can stay in ordinary registers or stack slots.

It is allocated with `promise_type::operator new` when the promise
declares one — the customisation point for pooling frames — and with
global `operator new` otherwise. A promise that also declares a static
`get_return_object_on_allocation_failure()` opts into the nothrow form,
so allocation failure produces that object instead of an exception.

The allocation is **elidable**: HALO (P0981) lets an implementation put
the frame in the caller's stack frame when it can prove the coroutine's
lifetime is nested inside the caller's and the handle does not escape —
typically after inlining, for a generator consumed by a loop in the same
translation unit. It is an optimisation, never a guarantee, so a hot
path that must not allocate needs a pooled `operator new` rather than
hope.
