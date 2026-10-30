---
id: ub-explain-optimiser-contract
kind: explain
version: 2
level: 3
tags: [undefined-behaviour, optimisation]
requires:
  - cpp-essentials/ub-null-check-after-use
  - cpp-essentials/ub-definition
  - types-signed-overflow-ub
  - ub-chunk-precondition-assert
elaborate: Where else in your own code does a check come after the operation it is meant to guard?
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://timsong-cpp.github.io/cppwp/n4950/intro.abstract#5
---
A new teammate has just watched `-O2` delete their null check, written after the dereference. Explain to them why the compiler may do that.
---
- [ ] A null dereference is undefined behaviour, and the standard then guarantees nothing about the whole execution
- [ ] The optimiser assumes undefined behaviour never happens, so once `*p` has run, `p` cannot be null
- [ ] A null test after that dereference can never be true, so it is dead code and removed
- [ ] Signed overflow works the same way: GCC folds `x + 1 > x` to `true` for `int`
- [ ] The fix states the precondition before the dereference: test `p`, or `assert(p != nullptr)`, first
