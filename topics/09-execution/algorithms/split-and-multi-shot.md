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

---

Because a sender may own the things it will hand over. A sender built
around a move-only value, or one that hands a buffer to exactly one
operation, cannot serve two consumers — so `connect` takes the sender
by value and a *single-shot* sender is consumed by it. Trying to
connect the same one twice is a compile-time or a
moved-from error, not a run-time surprise.

`split(sndr)` turns it into a **multi-shot** sender: it allocates a
shared state, starts the underlying operation once, records the
completion, and delivers it to every consumer that connects — those
that connect before it finishes are resumed on completion, and those
that connect afterwards get the stored result immediately. The values
are shared, so each consumer sees them by `const&`.

That shared state is the cost, and it is exactly the allocation the
rest of the model works to avoid, so `split` is a deliberate choice
rather than a default: use it for a genuinely shared result — a
configuration loaded once and read by several branches — and prefer
restructuring, or `when_all` over independent senders, where the fan-out
is really just parallel work.

The diamond it enables is the usual reason: `auto s = load() | split();`
then `when_all(s | then(a), s | then(b))`.
