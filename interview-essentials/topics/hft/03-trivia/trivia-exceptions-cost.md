---
id: trivia-exceptions-cost
kind: basic
version: 1
level: 3
tags: [hft-trivia, exceptions, performance, abi]
requires:
  - cpp-essentials/exceptions-unwinding-destroys-locals
refs:
  - https://itanium-cxx-abi.github.io/cxx-abi/abi-eh.html
  - https://en.cppreference.com/w/cpp/language/throw
  - https://wg21.link/p0709r4
elaborate: Which failures in your trading path are expected outcomes, and which are truly exceptional enough to justify the throw?
---

## A GCC x86-64 `try` block adds no instructions to the happy path. Why is `throw` still avoided for rejected orders?

---

**Each throw is a slow library call: allocate, then search unwind tables.**
Under the Itanium ABI the exception object is normally heap-allocated,
then the unwinder walks the stack twice: a search phase, then a cleanup
phase. That costs hundreds of ns to µs per throw, against a few ns for a
return code.
