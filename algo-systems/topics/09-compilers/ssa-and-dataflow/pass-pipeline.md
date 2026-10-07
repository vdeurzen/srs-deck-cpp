---
id: compiler-pass-pipeline
kind: basic
version: 1
level: 2
tags: [compilers, optimisation, llvm]
refs:
  - https://llvm.org/docs/Passes.html
  - https://llvm.org/docs/NewPassManager.html
elaborate: A query planner applies rewrite rules one after another. Which contract must each of its rules keep?
---

## `opt -O2` runs a long sequence of transform passes over LLVM IR. What must each pass guarantee so that any of them may follow any other?

---

**Valid IR in, valid IR out, with the program's observable behaviour unchanged.**

A pass sees only the IR, never the internals of the pass before it, so
passes compose by running in sequence: each does one small rewrite, and
`-O2` is a list of them, some repeated.
