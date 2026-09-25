---
id: callables-explain-type-erasure
kind: explain
version: 1
level: 4
tags: [callables]
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
---
Explain how `std::function` type-erases a callable to a senior
interviewer: what it stores, what it costs, and when you would not use it.
---
- [ ] Type erasure hides the concrete callable type behind a fixed, uniform interface (`operator()` with a given signature)
- [ ] Internally, a vtable-like set of function pointers (or a manually-built equivalent) dispatches to the stored callable's actual type
- [ ] The callable is owned: copied or moved into `std::function`'s internal storage, heap-allocated unless it fits small-buffer optimisation
- [ ] Calling through `std::function` is an indirect call and usually not inlinable, unlike a template parameter deduced per callable
- [ ] `std::function` is copyable, requiring the stored callable to be copyable too — a move-only lambda cannot be stored
- [ ] Prefer a template parameter (deduced per call site) when the callable's type can be known at compile time and copies would be wasteful
- [ ] Prefer `std::function_ref` over `std::function` when the callable only needs to live for the duration of one call and ownership is not needed
- [ ] `std::function`'s empty state throws `std::bad_function_call` if invoked, unlike a null function pointer
