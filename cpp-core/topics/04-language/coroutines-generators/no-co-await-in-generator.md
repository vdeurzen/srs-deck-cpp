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

## `co_await` inside a `std::generator` body does not compile. What in its promise forbids it?

---

**A deleted `await_transform`.** `std::generator`'s promise declares
`void await_transform() = delete;`, and a single `await_transform`
declaration captures every `co_await` in the coroutine — so each one
finds that declaration and no viable call. It is a deliberate,
compile-time "this coroutine is synchronous", and the mistake it
catches is reaching for `std::generator` to write an asynchronous
stream.
