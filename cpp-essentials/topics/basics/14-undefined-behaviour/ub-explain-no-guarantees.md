---
id: ub-explain-no-guarantees
kind: explain
version: 1
level: 2
tags: [undefined-behaviour]
requires:
  - ub-optimiser-assumes-no-overflow
  - ub-sanitizer-flags
  - ub-static-assert-finds-ub
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html
---
A teammate says: "It's only undefined behaviour, and our tests pass."
Explain what undefined behaviour is, where it comes from, and how the
team finds it.
---
- [ ] The standard requires nothing of a run that contains undefined behaviour, so passing tests prove nothing
- [ ] The optimiser assumes undefined behaviour never happens and simplifies from that, e.g. `x + 1 < x` on an `int` becomes `false`
- [ ] Names common sources: an out-of-bounds index, reading an uninitialised local, signed overflow (unsigned wrap is defined), using an object after its lifetime ended
- [ ] A `static_assert` on a `constexpr` call catches core-language undefined behaviour at compile time, because constant evaluation must reject it
- [ ] Sanitizers (`-fsanitize=address,undefined`) catch it at run time, but only on the paths the run executes
