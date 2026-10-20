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
elaborate: Say aloud which of these five points you would lead with if the teammate's code were a hot loop shipped at `-O2`, and why.
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html
---
A teammate says: "It's only undefined behaviour, and our tests pass."
Answer them, aloud, as you would in a code review.
---
- [ ] The standard requires nothing of a run that contains undefined behaviour, so passing tests prove nothing
- [ ] The optimiser assumes undefined behaviour never happens, so an `int` overflow check `x + 1 < x` folds to false
- [ ] Example: reading through a pointer after `delete` is undefined behaviour, even when it still yields the old value
- [ ] A `static_assert` on a `constexpr` call catches core-language undefined behaviour at compile time, because constant evaluation must reject it
- [ ] Sanitizers (`-fsanitize=address,undefined`) catch it at run time, but only on the paths the run executes
