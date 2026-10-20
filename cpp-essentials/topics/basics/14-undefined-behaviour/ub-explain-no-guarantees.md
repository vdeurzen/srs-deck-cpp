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
- [ ] Problem: the standard requires nothing of a run containing undefined behaviour, so passing tests prove nothing
- [ ] Mechanism: the optimiser assumes it never happens, so an overflow check written after the addition can be deleted
- [ ] Example: reading through a pointer after `delete` is undefined, even when it still yields the old value
- [ ] Limit: tools catch only what runs (the sanitizer flags) or is constant-evaluated (a `static_assert`)
- [ ] Pitfall: testing cannot fix it; remove the operation, for example check the bound before adding
