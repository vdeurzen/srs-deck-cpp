---
id: execution-split-multi-shot
kind: basic
version: 1
level: 5
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## Why can most senders be connected only once, and what does `split` change?

(`split` is from P2300R10 and the `stdexec` reference implementation; it was
removed from the C++26 draft by P3682.)

---

Because a sender may own the things it will hand over. A sender built
around a move-only value, or one that hands a buffer to exactly one
operation, cannot serve two consumers — so a *single-shot* sender can
only be `connect`ed as an rvalue, and is consumed by it. Connecting an
lvalue of one fails to compile; connecting it twice means connecting a
moved-from object.

`split(sndr)` turns it into a **multi-shot** sender: it allocates a
shared state, starts the underlying operation once, records the
completion, and replays it to every consumer — those still waiting
when it finishes are completed then, and one that starts after the
fact is completed from the stored result. The values are shared, so
each consumer sees them by `const&`.

That shared state is the cost, and it is exactly the allocation the
rest of the model works to avoid, so `split` is a deliberate choice
rather than a default: use it for a genuinely shared result — a
configuration loaded once and read by several branches — and prefer
restructuring, or `when_all` over independent senders, where the fan-out
is really just parallel work.

The diamond it enables is the usual reason: `auto s = load() | split();`
then `when_all(s | then(a), s | then(b))`.

**C++26 status.** `split` was in P2300R10 but was removed from the
working draft by P3682 (Sofia, 2025), following `ensure_started` and
`start_detached` (removed by P3187 in 2024). The C++26 answer to
"share or detach work" is an explicit async scope (`counting_scope`
with `spawn` / `spawn_future`); `stdexec::split` remains available in
the reference implementation.
