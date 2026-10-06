---
id: coroutines-generator-explain-costs
kind: explain
version: 1
level: 4
tags: [coroutines, ranges, lifetimes]
requires:
  - coroutines-generator-dangling-parameter
  - coroutines-generator-elements-of
  - coroutines-generator-element-references
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
An interviewer asks what `std::generator` costs and where it bites.
Explain the price, the two lifetime traps and the two usage rules.
---
- [ ] One heap allocation for the frame unless HALO elides it, plus a resume per element — measurably slower than filling a `vector` when the whole sequence is wanted anyway
- [ ] `begin()` does real work: it resumes the body up to the first element and may throw whatever the body throws; call it once
- [ ] Elements are references to the yielded object, valid until the next increment; storing one for later is a dangling reference
- [ ] Reference parameters are borrows the caller must outlive; pass by value when the generator outlives the call expression
- [ ] Recursion needs `co_yield std::ranges::elements_of(sub)` to stay at one resume per element rather than one per level
