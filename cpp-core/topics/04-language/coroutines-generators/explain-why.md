---
id: coroutines-generator-explain-why
kind: explain
version: 2
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-is-a-view
  - coroutines-generator-pull-is-blocking
elaborate: Why could a `std::generator` body not wait for a network reply, and what would you use instead?
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
An interviewer asks what `std::generator` gives you that returning a
filled `std::vector` does not. Explain it to them.
---
- [ ] It is lazy: each time the consumer advances, the body runs only to the next `co_yield`
- [ ] So an unbounded or expensive sequence costs only what is consumed; `while (true) co_yield next();` is fine
- [ ] Peak memory is the frame and one element, not the whole sequence
- [ ] Stopping early just destroys the generator, which destroys the frame and runs its live locals' destructors
- [ ] It models `input_range`, so range-based `for` and range adaptors accept it like any other range
