---
id: rng-explain-range-algorithms
kind: explain
version: 2
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
- [ ] `ranges::sort` takes a projection: a function applied to each element before comparing, so the comparator sees only the key
- [ ] A projection can be a pointer to a member, which sorts by that member with no lambda expression
- [ ] Sorting a temporary range returns `std::ranges::dangling`, so using that result as an iterator is a compile error
- [ ] (empty: tick this)
