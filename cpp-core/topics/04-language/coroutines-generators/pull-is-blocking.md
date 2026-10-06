---
id: coroutines-generator-pull-is-blocking
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-generator-no-co-await
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---

## Even if `std::generator` allowed `co_await`, why could its body still not wait for I/O?

---

**Because the consumer pulls through `operator++`, an ordinary blocking
call.** It resumes the coroutine and returns when the next value
exists; it cannot say "nothing yet, come back later". A body suspended
on I/O would leave the iterator with nothing to return and nobody to
resume it. An async stream needs an awaitable advance: an
`async_generator`, absent from C++23.
