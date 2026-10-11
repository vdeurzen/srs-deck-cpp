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

`co_await expr` first asks `expr`'s awaiter whether the result is
already available, via {{c1::await_ready::returning true skips the rest
of the protocol entirely}}. If it is not, the coroutine is parked and
{{c2::await_suspend}} runs with a handle to it — the place to hand that
handle to a scheduler or register a completion callback. When control
later comes back into the coroutine, {{c3::await_resume::its return
value becomes the result of the whole co_await expression}} runs to
produce the awaited value.
