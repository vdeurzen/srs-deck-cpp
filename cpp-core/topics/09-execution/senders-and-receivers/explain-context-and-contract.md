---
id: execution-explain-context-and-contract
kind: explain
version: 1
level: 5
tags: [execution, async, c++26, scheduling]
refs:
  - https://eel.is/c++draft/exec.sched
  - https://eel.is/c++draft/exec.getcomplsigs
  - https://eel.is/c++draft/exec.sync.wait
requires:
  - execution-starts-on-vs-continues-on
  - execution-completion-signatures
  - execution-sync-wait
---
Explain how a `std::execution` pipeline says *where* its work runs and
*what* it can complete with, and how ordinary code gets the result out.
---
- [ ] A **scheduler** is a cheap, copyable handle to an execution context, not the context itself
- [ ] `schedule(sch)` is a sender completing with no values on that context, so "go there" composes like any other work
- [ ] `starts_on` picks where work begins and `continues_on` where everything after it runs; without them a continuation runs wherever its predecessor finished
- [ ] **Completion signatures** make the contract a compile-time type: a receiver that cannot take a listed completion fails at `connect`
- [ ] `std::this_thread::sync_wait` blocks the calling thread and returns `optional<tuple<Vals...>>`: values engaged, errors rethrown, stopped as `nullopt`
