---
id: coroutines-generator-explain-why
kind: explain
version: 1
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-is-a-view
  - coroutines-generator-pull-is-blocking
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
An interviewer asks what `std::generator` gives you that returning a
filled `std::vector` does not. Explain the upside and its one built-in
limit.
---
- [ ] It is lazy: the body runs only as far as the consumer pulls, so an infinite or expensive sequence costs only what is consumed
- [ ] Peak memory is one element rather than the whole sequence — the win for large or streamed data
- [ ] It inverts control without a callback: the producer keeps its loop and its local state instead of being turned inside out into a state machine or a visitor
- [ ] It is an `input_range` and move-only, so it composes with `views::take`, `views::filter` and friends but cannot be traversed twice
- [ ] It is synchronous by construction — the consumer pulls through a blocking `operator++`, and a deleted `await_transform` overload rejects every `co_await`; an async stream needs a different type
