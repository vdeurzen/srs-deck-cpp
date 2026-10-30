---
id: callables-explain-type-erasure
kind: explain
version: 3
level: 4
tags: [callables, type-erasure]
requires:
  - callables-explain-function-storage
  - callables-explain-function-costs
elaborate: Where in code you know is a `std::function` stored, and where is one only called during the call?
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/functional/move_only_function
---
An event bus stores subscribers in a
`std::vector<std::function<void(const Event&)>>` and calls each one per
event. `subscribe(f)` stores a copy of `f` in that vector, and a
`for_each_subscriber(cb)` query, also taking a `std::function`, calls
`cb` synchronously on each subscriber before it returns. An interviewer
asks whether `std::function` is the right type in both places. Explain it
to them.
---
- [ ] For stored subscribers, yes: erasure lets closure objects and functors of different types share one vector
- [ ] A template parameter could store only one callable type, so it cannot replace that vector
- [ ] `subscribe` stores its own copy of each closure object, so large captures cost a copy, possibly a heap allocation
- [ ] Each dispatch is an indirect, non-inlinable call: fine at event rates, wrong for a per-element inner loop
- [ ] `for_each_subscriber` only calls `cb` during the call, so `std::function` may allocate for nothing; a template parameter fits
