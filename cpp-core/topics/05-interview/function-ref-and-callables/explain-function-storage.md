---
id: callables-explain-function-storage
kind: explain
version: 1
level: 3
tags: [callables, type-erasure]
requires:
  - staticpoly-type-erasure-skeleton
  - lambda-store-std-function
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/functional/move_only_function
---
After `std::function<int(int)> f = some_lambda;`, explain what `f`
holds and how a call `f(3)` reaches the lambda.
---
- [ ] Only the signature `int(int)` stays visible: any callable invocable that way can be assigned, and its concrete type is erased
- [ ] Inside is the concept/model shape: a model for the concrete type behind a uniform call, copy and destroy interface (virtual functions or a hand-built table of function pointers)
- [ ] `f` owns a copy of the lambda (or a moved-in one): small callables may sit in an internal buffer, larger ones go on the heap; the buffer size is implementation-defined
- [ ] Because `std::function` is copyable, the target must be copy-constructible: a lambda capturing a `unique_ptr` is rejected, which C++23's `std::move_only_function` lifts
- [ ] Copying `f` copies the stored lambda and its captures through the model's copy operation: two independent targets, never a shared one
