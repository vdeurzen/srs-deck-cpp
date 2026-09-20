---
id: execution-explain-structured-concurrency
kind: explain
version: 1
level: 5
tags: [execution, async, c++26, concurrency]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---
Explain what "structured concurrency" means in `std::execution`, and
what a codebase gets from it that a thread-pool-plus-futures design
does not.
---
- [ ] Every operation has an owner: `connect` yields an operation state the caller places, and composition nests children inside their parent's state
- [ ] Lifetime is lexical again — a child cannot outlive the operation state it lives in, so borrowing from an enclosing scope is safe without `shared_ptr`
- [ ] Nothing starts by itself: senders are inert until `start`, so "where and when does this run" is decided by the caller, not by the callee
- [ ] Joining is explicit: `when_all` completes only after every child has completed, on whatever channel
- [ ] Cancellation flows down through the environment's stop token and comes back as `set_stopped` completions — requested, then awaited, never forced
- [ ] Errors have a destination: a child's failure completes its parent, which is an ordinary code path rather than a terminate-by-default
- [ ] Storage is statically known: a whole pipeline is one object of one compile-time size, so async code can run without heap allocation
- [ ] Detached work is the exception and needs an explicit async scope that owns the operation states, so shutdown can wait for it
- [ ] Against futures: eager start, one allocation per link, no cancellation, no way to say where a continuation runs, and errors that surface only where someone happens to call `.get()`
- [ ] The cost: heavier compile times and famously large type names, and a model the whole codebase has to adopt at its edges to pay off
