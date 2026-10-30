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
  - coroutines-generator-is-a-view
elaborate: Which loop in your own code would you turn into a generator, and which of these traps would you check first?
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---
An interviewer asks what goes wrong, in speed or in correctness, when
`std::generator` is used carelessly. Explain it to them.
---
- [ ] Each call allocates a frame and each element costs a resume: slower than a `vector` when everything is wanted
- [ ] `begin()` resumes the body up to the first element, so it does real work and may throw
- [ ] Each element is a reference into the frame, dangling after the next increment; copy it to keep it
- [ ] A reference parameter is only a borrow: a temporary argument dies before iteration, so take it by value
- [ ] A recursive generator yields `std::ranges::elements_of(sub)`: one resume per element instead of one per level
