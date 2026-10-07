---
id: callables-explain-type-erasure
kind: explain
version: 2
level: 4
tags: [callables, type-erasure]
requires:
  - callables-explain-function-storage
  - callables-explain-function-costs
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/functional/move_only_function
---
An event bus stores subscribers in a
`std::vector<std::function<void(const Event&)>>` and calls each one per
event. Reason through what this design buys and where it bites.
---
- [ ] Because each subscriber is erased behind `void(const Event&)`, lambdas, functors and bound members sit in one vector: the reason erasure is right here, where a template parameter could store only one type
- [ ] Because `std::function` must be copyable, subscribing a lambda that captures a `unique_ptr` fails to compile; `std::move_only_function` accepts it, and then the subscriber vector, and the bus, become move-only
- [ ] Because every dispatch is an indirect call the optimiser cannot see through, each event pays one non-inlinable call per subscriber: fine at event rates, wrong for a per-pixel inner loop, which wants a template parameter
- [ ] Because `subscribe` stores its own copy of each closure, a subscriber capturing a large object by value pays that copy, and possibly a heap allocation, at every `subscribe`, and again whenever the bus itself is copied
- [ ] A `for_each_subscriber(cb)` query that runs `cb` only during the call needs no ownership, so taking it as `std::function` may allocate for nothing: a template parameter (or `std::function_ref` in C++26) fits
