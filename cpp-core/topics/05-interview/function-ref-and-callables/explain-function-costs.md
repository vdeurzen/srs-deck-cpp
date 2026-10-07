---
id: callables-explain-function-costs
kind: explain
version: 1
level: 4
tags: [callables, type-erasure, performance]
requires:
  - callables-function-ref-signature
  - staticpoly-static-vs-dynamic
  - lambda-store-std-function
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/utility/functional/function_ref
  - https://wg21.link/P0792
---
A hot loop calls a `std::function<bool(int)>` parameter once per
element. Explain what that costs, and which parameter type you would
choose instead, case by case.
---
- [ ] Each call is an indirect call through the erased interface, which the optimiser usually cannot inline
- [ ] Constructing or copying the `std::function` may heap-allocate, whenever the callable does not fit the small internal buffer
- [ ] A constrained template parameter (`std::invocable<int> F`, taken as `F&&`) knows the exact type: the call can inline and nothing allocates; the price is one instantiation per callable type, with the body visible in the header
- [ ] When the callable must be stored for later (a member, a container, a queue), erasure is the point: keep `std::function`, or `std::move_only_function` (C++23) for a move-only callable
- [ ] A non-template interface that only calls the callback during the call wants a non-owning reference: `std::function_ref` (C++26, P0792, not in GCC 14), until then a template or a function pointer plus a context pointer
