---
id: execution-start-may-complete-inline
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.opstate.start
  - https://eel.is/c++draft/exec.async.ops
requires:
  - execution-connect-and-start
---

## What is wrong with this code?

```cpp
auto* req = new Request{id};          // freed by the receiver's set_value
auto op = connect(fetch(*req), Done{req});
start(op);
log(req->id);                         // "started request ..."
```

---

**The completion may already have run, and freed `req`, before `start`
returns.**

`start` is `noexcept` and called once; from then on exactly one
completion arrives on the receiver, possibly inline on this thread,
possibly on another thread at any moment. Anything after `start` must
already be safe to race with, or to find the work finished.
