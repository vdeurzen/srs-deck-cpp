---
id: ub-definition
kind: basic
version: 1
level: 1
tags: [undefined-behaviour]
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://timsong-cpp.github.io/cppwp/n4950/intro.abstract#5
---

## One operation in a C++23 program's execution has undefined behaviour. Which parts of that execution does the standard still make guarantees about?

---

**None, not even what ran before it.** The standard "imposes no
requirements" on an execution containing an undefined operation: no crash
promised, no wrong value confined to one variable, no diagnostic owed.
Undefined behaviour is a property of the whole run, so the compiler may
translate the program as if it never happens; that assumption makes the
consequences non-local.
