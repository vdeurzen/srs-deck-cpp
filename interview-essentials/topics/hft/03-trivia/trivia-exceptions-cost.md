---
id: trivia-exceptions-cost
kind: basic
version: 1
level: 3
tags: [hft-trivia, exceptions, performance, abi]
requires:
  - cpp-essentials/exceptions-unwinding-destroys-locals
  - foundations-latency-scale
  - cpp-essentials/err-pick-a-channel
refs:
  - https://itanium-cxx-abi.github.io/cxx-abi/abi-eh.html
  - https://en.cppreference.com/w/cpp/language/throw
  - https://wg21.link/p0709r4
elaborate: Which failures in your trading path are expected outcomes, and which are truly exceptional enough to justify the throw?
---

## With GCC on x86-64, a `try` block adds no instructions to the path where nothing throws. Why is `throw` still avoided for rejected orders?

---

**Each throw is a slow library call: allocate, then search lookup tables for a handler.**
Under GCC's exception ABI the exception object is normally heap-allocated,
then the runtime walks the stack twice: once to find a handler, once to
run destructors. That costs hundreds of ns to µs per throw, against a
few ns for a return code.
