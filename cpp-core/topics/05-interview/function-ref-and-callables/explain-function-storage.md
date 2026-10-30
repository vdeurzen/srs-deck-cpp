---
id: callables-explain-function-storage
kind: explain
version: 2
level: 3
tags: [callables, type-erasure]
requires:
  - staticpoly-type-erasure-skeleton
  - cpp-essentials/lambda-store-std-function
elaborate: What happens to the stored closure object, and to its captures, when you copy `f`?
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/functional/move_only_function
---
After `std::function<int(int)> f = some_lambda;`, a colleague asks what `f`
actually holds. Explain it to them.
---
- [ ] `f` owns its own copy of the closure object, whose concrete type is erased; only `int(int)` stays visible
- [ ] Any callable invocable as `int(int)` can be assigned, so `f`'s type never depends on the lambda expression
- [ ] Inside is a concept/model pair: a model for the concrete type behind a uniform call, copy and destroy interface
- [ ] A small closure object may sit in an internal buffer; a larger one goes on the heap
- [ ] Calling `f(3)` goes through that interface's virtual call to the stored closure object's `operator()`
