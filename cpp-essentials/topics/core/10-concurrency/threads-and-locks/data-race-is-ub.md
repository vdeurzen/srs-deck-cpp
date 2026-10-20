---
id: threads-data-race-is-ub
kind: basic
version: 1
level: 1
tags: [concurrency, threads, memory-model, undefined-behaviour]
requires:
  - ub-definition
  - conc-data-race-one-writer
elaborate: Pick one object in your own code that two threads touch. What, exactly, orders their accesses — a lock, an atomic, a join — and if nothing does, why did it seem fine?
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://eel.is/c++draft/intro.races
---

Nothing (no lock, no atomic, no `join`) makes either access *happen
before* the other, that is, guaranteed to finish before the other starts.

## Two threads each run `++n` on the same plain `int n` at once. What does the standard say about the program?

---

**Undefined behaviour: the two accesses are a data race.**

A data race is two *conflicting* actions (same memory location, at
least one a write), not both atomic, with neither happening before the
other. The consequence is not "a lost increment": the whole
execution loses meaning, so "it works on x86" proves nothing.
