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
  - ub-sanitizer-address
elaborate: Say aloud which of these five points you would lead with if the teammate's code were a hot loop shipped at `-O2`, and why.
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html
---
A teammate says: "It's only undefined behaviour, and our tests pass."
Answer them, aloud, as you would in a code review.
---
- [ ] The standard requires nothing of a run containing undefined behaviour, so passing tests prove nothing
- [ ] The optimiser assumes it never happens, so an overflow check written after the addition can be deleted
- [ ] Reading through a pointer after `delete` is undefined, even when it still yields the old value
- [ ] Tools catch it only on paths actually evaluated, in a sanitizer run or a `static_assert`
- [ ] The real fix removes the operation, for example checking the bound before the addition rather than after it
