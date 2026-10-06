---
id: coroutines-suspension-points-cloze
kind: cloze
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-what-makes-a-coroutine
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

`co_await expr` suspends the coroutine unless `expr`'s awaiter reports it
is already ready via {{c1::await_ready::returning true skips suspension
entirely}}. On suspension, {{c2::await_suspend}} runs with a handle to the
now-suspended coroutine, and is where scheduling onto another thread or
registering a completion callback happens; when the coroutine is later
resumed, {{c3::await_resume::its return value becomes the result of the
whole co_await expression}} runs to produce the awaited value.
