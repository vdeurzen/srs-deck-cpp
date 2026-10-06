---
id: coroutines-generator-explain
kind: explain
version: 2
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-explain-why
  - coroutines-generator-explain-costs
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
Put it together: show how `std::generator`'s upside and its costs both
follow from two facts — it is lazy, and it is pulled — then state the
rule against `std::vector`.
---
- [ ] Laziness means the body runs after the call has returned — which is why a reference parameter is a borrow that must outlive the whole iteration, not just the call
- [ ] Because elements are yielded by reference from a frame that resumes on `++`, "one element of memory" and "copy before advancing" are the same fact seen from two sides
- [ ] Because the consumer pulls through a blocking `operator++`, the generator is synchronous — and `begin()` doing work, possibly throwing, is that same pull happening once at the start
- [ ] Because each level of a recursive generator is its own suspended frame, nesting costs one resume per level unless `elements_of` splices the child onto the parent by symmetric transfer
- [ ] The deciding property against `vector` is who decides how much is produced: when the producer does (the whole sequence is wanted anyway), the frame allocation and the per-element resume buy nothing
