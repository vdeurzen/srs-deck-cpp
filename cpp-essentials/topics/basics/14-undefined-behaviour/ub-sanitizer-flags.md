---
id: ub-sanitizer-flags
kind: cloze
version: 1
level: 2
tags: [undefined-behaviour, tooling, sanitizers]
requires:
  - ub-passing-tests-prove-nothing
refs:
  - https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html
  - https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html
---

Sanitizers are run-time checkers that a compiler flag builds into the
program. Signed overflow is reported by
{{c1::`-fsanitize=undefined`::a GCC and Clang flag}}, which also checks
indexing into arrays whose bound is known at compile time. Out-of-bounds
access to heap, stack or global memory in general, and use of freed
memory, need {{c2::`-fsanitize=address`::a second flag}}. Each reports only
what the test run actually executes.
