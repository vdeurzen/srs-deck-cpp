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
`sync_wait(scope.join())`. Walk a reviewer through what each design
choice buys, as cause and consequence.
---
- [ ] When `fetch_orders` fails, `when_all` requests stop on `fetch_user` and waits, so nothing reads `id` once freed
- [ ] `spawn` compiles only once each pipeline handles its errors, so a failed request is logged, not silently lost
- [ ] `request_stop()` reaches every leaf through the environment; in-flight I/O cancels but still completes, so nothing is freed early
- [ ] After `close()`, a new request's `spawn` never starts its pipeline, so the server must refuse it another way
- [ ] `join()` completes only when no pipeline is in flight, so destroying the scope afterwards is safe
