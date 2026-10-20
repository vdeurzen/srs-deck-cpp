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

**A throw allocates the exception object, then walks the stack twice: about 1 µs against 1 ns.**
Under GCC's exception ABI the runtime walks the stack once to find a
handler and again to run destructors, using lookup tables. Measured
with GCC 16.2 at `-O2`: about 750 ns per throw and catch, about 1 ns
per error return.
