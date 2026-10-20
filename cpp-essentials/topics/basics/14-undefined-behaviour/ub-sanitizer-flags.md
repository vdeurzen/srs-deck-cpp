---
id: ub-sanitizer-flags
kind: cloze
version: 1
level: 2
tags: [undefined-behaviour, tooling, sanitizers]
requires:
  - ub-optimiser-assumes-no-overflow
elaborate: Say which overflow in code you know this flag would have caught, and why a passing run without it proves nothing.
refs:
  - https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html
  - https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html
---

A sanitizer is a run-time checker that a compiler flag builds into the
program. Signed `int` overflow, as it happens, is reported by building
with {{c1::`-fsanitize=undefined`::a GCC and Clang flag}}. It reports only
what the test run actually executes.
