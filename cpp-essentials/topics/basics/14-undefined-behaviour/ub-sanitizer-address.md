---
id: ub-sanitizer-address
kind: cloze
version: 1
level: 2
tags: [undefined-behaviour, tooling, sanitizers]
requires:
  - ub-use-after-free
elaborate: Say which memory bug in code you know this flag would have caught, and what it costs to leave it on in every test build.
refs:
  - https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html
  - https://clang.llvm.org/docs/AddressSanitizer.html
---

A sanitizer is a run-time checker that a compiler flag builds into the
program. Reading through a pointer after `delete`, or past the end of an
array, is reported by building with
{{c1::`-fsanitize=address`::a GCC and Clang flag}}. It reports only what
the test run actually executes.
