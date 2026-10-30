---
id: coroutines-generator-explain
kind: explain
version: 3
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-explain-why
  - coroutines-generator-explain-costs
elaborate: Name one function in code you know that returns a `std::vector` but would be better as a generator, or the reverse.
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
An interviewer asks when you would return a `std::generator` rather than a
filled `std::vector`, and why. Explain it to them.
---
- [ ] The deciding question is who decides how much is produced: a consumer that may stop early favours the generator
- [ ] Laziness computes only what is pulled, so an unbounded or expensive sequence costs only what is consumed
- [ ] Peak memory is the frame and one element, not the whole sequence
- [ ] When the whole sequence is wanted anyway, the frame allocation and per-element resumes buy nothing: return a `vector`
- [ ] A `vector` also suits a consumer that traverses twice or keeps elements; a generator is single-pass, its references dangle
