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
  - https://clang.llvm.org/docs/MemorySanitizer.html
---

Sanitizers are run-time checkers that a compiler flag builds into the
program. Signed overflow is reported by
{{c1::`-fsanitize=undefined`::a GCC and Clang flag}}; out-of-bounds reads
and use of freed memory are the job of `-fsanitize=address`. Each
reports only what the test run actually executes.
