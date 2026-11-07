---
id: lambda-explain-closures
kind: explain
version: 2
level: 3
tags: [lambdas, callables]
requires:
  - lambda-closure-type
  - lambda-capture-trace
  - lambda-dangling-reference
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Closure_type
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://en.cppreference.com/w/cpp/utility/functional/function
elaborate: Pick a callback in your own code; say what its closure object holds, and whether anything it captured can die first.
---

An interviewer asks what a C++ lambda expression really creates. Explain it to them.

---

- [ ] A lambda expression creates an object of a unique, unnamed class the compiler writes: the closure object
- [ ] Each capture becomes a data member of the closure's class, and the body becomes its `operator()`
- [ ] A by-value capture `[n]` stores a copy of `n` as a member, made when the lambda expression runs
- [ ] A reference capture `[&n]` stores a reference to the original `n`, not a copy
