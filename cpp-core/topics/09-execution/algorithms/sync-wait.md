---
id: execution-sync-wait
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## What does `std::this_thread::sync_wait(sndr)` return, and why does it live in `std::this_thread` rather than `std::execution`?

---

It is the bridge from the asynchronous world back to an ordinary
function: it connects the sender to an internal receiver, starts it,
**blocks the calling thread** until a completion arrives, and then
translates the three channels into ordinary C++ results:

- `set_value(vals...)` → `std::optional<std::tuple<Vals...>>` holding
  the values;
- `set_error(e)` → the error is thrown (an `exception_ptr` is
  rethrown);
- `set_stopped()` → `std::nullopt`.

The namespace is the documentation: `sync_wait` is a property of *this
thread*, which it parks. It is the one place in the model where a
thread is deliberately given up, so it belongs at the edges — `main`,
a test, a thread that owns a request — and never inside a sender chain,
where blocking a scheduler's worker is how you deadlock a pool.

One detail repays knowing: `sync_wait` puts a scheduler for its own
internal `run_loop` into the receiver's environment. Work that asks
for a scheduler via `get_scheduler` and has none of its own therefore
gets one that runs on the blocked thread — the calling thread is not
just waiting, it is available to do the work.

Because it produces a `tuple`, `sync_wait` requires the sender to have
exactly one value completion signature; `sync_wait_with_variant`
handles senders that can complete in more than one shape.
