---
id: rng-explain-range-algorithms
kind: explain
version: 1
level: 4
tags: [algorithms, ranges, interview]
requires:
  - rng-projection-code
  - rng-named-range-code
  - rng-projection-intro
  - rng-ranges-form-vocab
elaborate: Say which call in your own code you would rewrite in the ranges form first, and what it would gain.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
  - https://en.cppreference.com/w/cpp/ranges/dangling
  - https://en.cppreference.com/w/cpp/iterator/projected
---
An interviewer asks what `std::ranges::sort` gives you over `std::sort`. Explain.
---
- [ ] You pass one range, not two iterators that could come from different containers
- [ ] It also takes an optional comparator and an optional projection
- [ ] A projection such as a pointer to a member sorts by that member, with no lambda expression
- [ ] The projection runs on every comparison, so it should be cheap
- [ ] On a temporary range it returns `std::ranges::dangling`, so misuse is a compile error, not a dangling iterator
