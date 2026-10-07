---
id: execution-let-value-keeps-values-alive
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, lifetimes]
refs:
  - https://eel.is/c++draft/exec.let
requires:
  - execution-then-vs-let-value
---

## `upload` returns a sender that keeps a reference to `doc.body` until it completes. Why is that safe here?

```cpp
auto job = load_document(id)
         | let_value([](const Document& doc) { return upload(doc.body); });
```

---

**`let_value` stores the predecessor's values in its operation state
until the returned sender completes.**

So `doc` outlives the inner work, and borrowing from it is fine. `then`
cannot promise this: its arguments are gone as soon as the callable
returns.
