---
id: conc-data-race-intro
kind: basic
version: 1
level: 1
tags: [concurrency, threads, memory-model]
requires:
  - conc-atomic-int-intro
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://eel.is/c++draft/intro.races
elaborate: Say where a `join()` would have to sit for the accesses to `a` to stop racing, and why that is enough.
---

```cpp
int a = 0;
int c = 5;
std::atomic<int> b{0};

void t1() { a = 1; b = 1; int u = c; }
void t2() { int x = a; int y = b; int v = c; }
// t1 and t2 run on two threads at once; no lock, no join between them
```

## The accesses to one of these variables form a *data race*. Which one: `a`, `b` or `c`?

---

**`a`: two threads access it, one writes, it isn't atomic, and nothing orders them.**

A data race needs all four. `c` is only read, and `b` is atomic, so
neither races. A lock or a `join` ordering the two accesses would also
remove the race on `a`.
