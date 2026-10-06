---
id: ub-explain-optimiser-contract
kind: explain
version: 1
level: 3
tags: [undefined-behaviour, optimisation]
requires:
  - ub-null-check-after-use
  - types-signed-overflow-ub
  - ub-constexpr-rejects-ub
  - ub-chunk-precondition-assert
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://timsong-cpp.github.io/cppwp/n4950/intro.abstract#5
---
A Go engineer joining your team has just watched the compiler delete their null check. Explain why that is allowed and what the team does about it.
---
- [ ] Undefined behaviour means the standard places no requirement on the whole execution, not just the faulting operation, and no diagnostic is owed
- [ ] The optimiser reasons from "undefined behaviour never happens": a dereference proves `p != nullptr`, a signed `+` proves no overflow, so a check those facts contradict is dead code
- [ ] That contract is why correct code pays nothing for the cases the standard rules out: no overflow test on every add, counters live in registers
- [ ] Practice: the check goes before the use, and an operation's precondition is written as an `assert` on the line that needs it
- [ ] Detection: constant evaluation must reject core-language undefined behaviour, so `static_assert` tests of `constexpr` code catch it at compile time, and sanitizers (`-fsanitize=undefined,address`) catch the rest at run time
