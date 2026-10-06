---
id: ub-data-race-counter
kind: code
version: 1
level: 2
tags: [undefined-behaviour, concurrency]
requires:
  - threads-data-race-is-ub
input: chips
choices:
  c1: ["std::atomic<int>", "volatile int", "int", "alignas(64) int"]
compile:
  harness: |
    void bump() { hits.fetch_add(1); }
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/language/cv
  - https://timsong-cpp.github.io/cppwp/n4950/intro.races#21
---

Several threads call `bump()` at the same time with no lock. On this
platform an aligned `int` store is a single instruction, so the team
expected at worst a lost increment, yet the race detector flags it.
Declare `hits` so the program has no data race.

```cpp
#include <thread>
{{c1::std\::atomic<int>}} hits{0};
```

---

The hardware story (aligned stores are indivisible) is true and
irrelevant, because the race is defined at the language level, and a
valid program contains none — so the compiler may keep `hits` in a
register, hoist the load out of a loop, or merge increments. `volatile`
only forbids the compiler eliding or reordering *its own* accesses to
`hits`; it says nothing about another thread, and two `volatile` writes
still race. `alignas` changes where `hits` sits, not who sees it.
`std::atomic<int>` is the type whose operations the memory model counts
as atomic, so `fetch_add` is one indivisible step that the other threads
observe.
