---
id: execution-explain-model
kind: explain
version: 1
level: 5
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---
Explain the sender/receiver model of `std::execution` to a colleague
who knows callbacks and `std::future` but has not read P2300.
---
- [ ] A **sender** describes work that has not started; building one runs nothing and allocates nothing
- [ ] A **receiver** is the callback bundle the result goes to, with three channels: `set_value`, `set_error`, `set_stopped`
- [ ] Exactly one channel is signalled, exactly once; all three completion functions are `noexcept` (an adaptor whose work throws reports it on `set_error`)
- [ ] `connect(sndr, rcvr)` produces an **operation state**; `start(op)` launches it, once, and is `noexcept`
- [ ] The operation state is immovable and must outlive the operation — composition nests child states inside parent ones, so a whole pipeline is one object the caller places
- [ ] A **scheduler** is a handle to an execution context; `schedule(sched)` is the sender that completes on it, and `starts_on`/`continues_on` say where work begins and resumes
- [ ] Receivers carry an **environment**, queried with `get_env`; that is how an operation finds its stop token, allocator or scheduler without any global
- [ ] Completion signatures make the contract a compile-time type, so mismatches are `connect`-time errors and `sync_wait` can name its return type
- [ ] Cancellation is a channel, not an exception: a stop request makes operations complete with `set_stopped`
- [ ] Consuming: `std::this_thread::sync_wait(sndr)` blocks and returns `optional<tuple<...>>`; detached work goes through an async scope that owns its operation states
- [ ] Senders and coroutines are two spellings of the same model — `as_awaitable`/`with_awaitable_senders` let a coroutine `co_await` a sender
