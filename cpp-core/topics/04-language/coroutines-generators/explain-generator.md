---
id: coroutines-generator-explain
kind: explain
version: 1
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-is-a-view
  - coroutines-generator-dangling-parameter
  - coroutines-generator-no-co-await
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
An interviewer asks when you would reach for `std::generator` instead of
returning a `std::vector`, and what it costs. Explain both sides.
---
- [ ] It is lazy: the body runs only as far as the consumer pulls, so an infinite or expensive sequence costs only what is consumed
- [ ] Peak memory is one element rather than the whole sequence — the win for large or streamed data
- [ ] It inverts control without a callback: the producer keeps its loop and its local state, instead of being turned inside out into a state machine or a visitor
- [ ] It is an `input_range` and move-only, so it composes with `views::take`, `views::filter` and friends but cannot be traversed twice
- [ ] Cost: one heap allocation for the frame unless HALO elides it, plus a resume per element — measurably slower than filling a `vector` when the whole sequence is wanted anyway
- [ ] Cost: elements are references into the frame, valid until the next increment; storing one for later is a dangling reference
- [ ] Reference parameters are borrows the caller must outlive; pass by value when the generator outlives the call
- [ ] Recursion needs `co_yield std::ranges::elements_of(sub)` to stay linear rather than paying one resume per level
- [ ] It is synchronous by construction — `await_transform` is deleted, so no `co_await`; an async stream needs a different type
