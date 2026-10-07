---
id: execution-then-vs-let-value
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
elaborate: "`let_error` and `let_stopped` have the same shape on the other two channels. What would you recover with each in your own code?"
refs:
  - https://eel.is/c++draft/exec.let
  - https://eel.is/c++draft/exec.then
requires:
  - execution-just-and-then
---

## When do you need `let_value` instead of `then`?

```cpp
auto s = read_config(path)                  // sender of Config
       | let_value([](const Config& c) {
           return fetch(c.url);             // returns a sender
         });
```

---

**When the continuation is itself asynchronous: it returns a sender,
not a value.**

`let_value` connects and starts the returned sender and completes with
its result. With `then`, `s` would be a sender *of a sender*: the inner
work described, never started.
