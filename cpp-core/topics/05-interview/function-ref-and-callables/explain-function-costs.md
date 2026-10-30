---
id: callables-explain-function-costs
kind: explain
version: 2
level: 4
tags: [callables, type-erasure, performance]
requires:
  - callables-function-ref-signature
  - cpp-essentials/staticpoly-static-vs-dynamic
  - cpp-essentials/lambda-store-std-function
elaborate: A non-template interface only calls its callback during the call; what would you take there, before and after C++26's `std::function_ref`?
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/functional/function_ref
  - https://wg21.link/P0792
---
A hot loop calls a `std::function<bool(int)>` parameter once per element.
An interviewer asks which parameter type you would use instead, and why.
Explain it to them.
---
- [ ] Each `std::function` call is an indirect call through the erased interface, which the optimiser usually cannot inline
- [ ] Constructing or copying it may also heap-allocate when the callable is too big for its internal buffer
- [ ] A constrained template parameter, `std::invocable<int> F` taken as `F&&`, knows the exact type, so the call inlines
- [ ] Its price is one instantiation per callable type, with the body visible in the header
- [ ] Keep `std::function` only when the callable must be stored for later, in a member or a queue
