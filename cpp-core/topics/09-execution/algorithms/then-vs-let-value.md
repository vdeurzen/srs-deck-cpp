---
id: execution-then-vs-let-value
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
requires:
  - execution-just-and-then
---

## When do you need `let_value` instead of `then`?

---

When the continuation is itself asynchronous. `then`'s callable returns
a **value**; `let_value`'s returns a **sender**, which the algorithm
then connects and starts, and whose completion becomes the result of
the whole thing.

```cpp
auto s = read_config(path)                        // sender of Config
       | let_value([&](const Config& c) {         // returns a sender
           return fetch(c.url);                   // more async work
         });
```

Writing that with `then` would produce a *sender of a sender*: the
inner work would be described and then dropped on the floor, never
started. `let_value` is the monadic bind of this vocabulary, and `then`
is the plain map.

The second half of `let_value`'s job is lifetime. The predecessor's
values are stored in the operation state and kept alive for as long as
the child sender runs, so the lambda can hand out references to them —
`fetch(c.url)` above may safely borrow from `c`. That is exactly the
guarantee `then` cannot give, because its values are gone as soon as
the callable returns.

`let_error` and `let_stopped` are the same shape on the other two
channels: recover from a failure, or substitute a value when the work
was cancelled, in both cases by returning a new sender.
