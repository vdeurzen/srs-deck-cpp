---
id: conc-lost-update-trace
kind: trace
version: 1
level: 1
tags: [concurrency, threads, tracing]
requires:
  - conc-thread-shares-memory
probes:
  1: { regB: "6" }
  2: { count: "6" }
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://eel.is/c++draft/intro.races
---

```cpp
// Threads A and B each run ++count once, on a shared int.
// The machine does ++count as three steps: load, add, store.
// Below, one order those six steps can take, written out by hand.
int count = 5;
int regA = count;     // A loads
int regB = count;     // B loads
regA = regA + 1;      // A adds
regB = regB + 1;      // @1 B adds
count = regA;         // A stores
count = regB;         // @2 B stores
```

---

B loaded `count` before A stored, so B adds to the stale 5 and gets 6.
Its store then overwrites A's 6 with another 6: two increments, but
`count` went up by one. That is a *lost update*. Values from running
this single-threaded copy (`g++ -std=c++23`); an actual two-thread run
of 100 000 increments each printed totals well below 200 000, different
on every run.
