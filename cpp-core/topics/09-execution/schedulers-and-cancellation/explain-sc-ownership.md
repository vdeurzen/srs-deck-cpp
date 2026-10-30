---
id: execution-explain-sc-ownership
kind: explain
version: 2
level: 5
tags: [execution, async, c++26, concurrency]
elaborate: Say what `close()` adds at shutdown, and what happens to a `spawn` that arrives after it.
refs:
  - https://eel.is/c++draft/exec.when.all
  - https://eel.is/c++draft/exec.counting.scopes
  - https://wg21.link/p3149
requires:
  - execution-connect-and-start
  - execution-when-all
  - execution-spawn-vs-spawn-future
  - execution-scope-close
---
A colleague asks why work started with `std::execution` may borrow
locals from the code that started it, without a `shared_ptr`. Explain
it to them.
---
- [ ] `connect` yields an operation state that the caller places, so every running operation has an owner
- [ ] Composition nests each child's operation state inside its parent's, so no child can outlive its parent
- [ ] `when_all` completes only after every child has completed, on whatever channel, so nothing still borrows
- [ ] Detached work is `spawn`ed into a `counting_scope`, which counts each operation until it completes
- [ ] The scope's `join()` completes only at a zero count, and destroying the scope before that calls `std::terminate`
