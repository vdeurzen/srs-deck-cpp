---
id: execution-explain-sc-ownership
kind: explain
version: 1
level: 5
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.when.all
  - https://eel.is/c++draft/exec.counting.scopes
  - https://wg21.link/p3149
requires:
  - execution-when-all
  - execution-spawn-vs-spawn-future
  - execution-scope-close
---
Explain who owns a running operation in `std::execution`, and why that
makes borrowing from an enclosing scope safe, including for detached work.
---
- [ ] Nothing starts by itself: a sender is inert until someone connects and starts it, so the caller decides when and where
- [ ] Every operation has an owner: `connect` yields an operation state the caller places, and composition nests each child inside its parent's, so a child cannot outlive it and borrowing from the enclosing scope is safe without `shared_ptr`
- [ ] Joining is explicit: `when_all` completes only after every child has completed, on whatever channel
- [ ] Detached work goes through an async scope: `spawn` returns nothing, the scope counts it, and destroying the scope before `join()` completes calls `std::terminate`
- [ ] `close()` makes later `spawn`s fail to associate and never start, so `join()` waits only for work already in flight
