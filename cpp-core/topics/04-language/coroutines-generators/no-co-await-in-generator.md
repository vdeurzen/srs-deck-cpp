---
id: coroutines-generator-no-co-await
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-generator-basic
  - coroutines-await-transform-hook
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---

## `co_await` inside a `std::generator` does not compile. What forbids it, and what does that tell you about mixing pull and push?

---

`std::generator`'s promise declares `await_transform` **as deleted**.
Since a single `await_transform` declaration captures every `co_await`
in the coroutine, deleting it makes every `co_await` in a
`std::generator` body ill-formed — a deliberate, compile-time "this
coroutine is synchronous".

The reason is in the consumer's signature. A generator is *pulled*:
`operator++` is an ordinary, blocking call that resumes the coroutine
and returns when the next value exists. There is no way for that call to
say "no value yet, come back later", so a body that suspended waiting
for I/O would leave the iterator with nothing to return and no one to
resume it.

Asynchronous streams therefore need a different type — an
`async_generator` whose "advance" is itself awaitable, so the consumer
is a coroutine too and can suspend while the producer waits. That type
is not in C++23; the usual sources are third-party libraries, or
building a channel on the same promise machinery. Reaching for
`std::generator` and hoping to sneak in a `co_await` is the mistake the
deleted hook is there to catch.
