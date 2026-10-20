---
id: lambda-explain-closures
kind: explain
version: 1
level: 3
tags: [lambdas, callables]
requires:
  - lambda-closure-type
  - lambda-capture-trace
  - lambda-store-std-function
  - lambda-dangling-reference
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Closure_type
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://en.cppreference.com/w/cpp/utility/functional/function
elaborate: Pick a callback in your own code; say what its closure object holds, and whether anything it captured can die first.
---

A Go teammate asks what a C++ lambda really is, compared with a Go
closure. Explain it to them.

---

- [ ] Problem: hand a small piece of behaviour, with the local values it needs, to an algorithm or callback
- [ ] Mechanism: the compiler makes an unnamed class whose data members are the captures
- [ ] Example: `[n]` copies `n` when the lambda is made, so later changes to `n` go unseen
- [ ] Cost: storing different lambdas together needs `std::function`, which may allocate on the heap
- [ ] Pitfall: a reference capture extends no lifetime, so returning such a closure from a function dangles
