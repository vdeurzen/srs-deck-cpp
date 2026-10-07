---
id: execution-explain-structured-concurrency
kind: explain
version: 2
level: 5
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.counting.scopes
  - https://eel.is/c++draft/exec.scope.counting
  - https://wg21.link/p3149
requires:
  - execution-explain-sc-ownership
  - execution-explain-sc-cancellation
---
A server `spawn`s one pipeline per request into a `counting_scope`;
each runs `when_all(fetch_user(id), fetch_orders(id))`, borrowing `id`
from request state the pipeline owns. At shutdown, `main` calls
`scope.request_stop()`, then `scope.close()`, then
`sync_wait(scope.join())`. Walk through what each design choice buys,
as cause and consequence.
---
- [ ] `fetch_orders` failing makes `when_all` request stop on `fetch_user` and wait for it, so nothing still reads `id` once the pipeline completes and its state is freed
- [ ] `spawn` would not compile until each pipeline handles its errors (e.g. `upon_error` with a `noexcept` handler), so a failed request is logged instead of vanishing in detached work
- [ ] `request_stop()` reaches every leaf as a stop request through each pipeline's environment; in-flight I/O is told to cancel and still completes, with `set_stopped`, so nothing is freed under the kernel
- [ ] A request arriving after `close()` is dropped: its `spawn` fails to associate and its pipeline never starts, so the server needs its own reply path for refused requests while `join()` drains the rest
- [ ] `join()` completes only when the count of in-flight pipelines is zero, so the scope is a complete inventory of detached work and destroying it after `join` is legal; a thread pool with detached futures keeps no such count to wait on
