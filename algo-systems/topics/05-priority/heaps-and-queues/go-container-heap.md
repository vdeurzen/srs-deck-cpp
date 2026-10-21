---
id: heap-go-container-heap
kind: basic
version: 2
level: 3
requires:
  - heap-vocabulary
  - heap-pop-heap-no-remove
tags: [heaps, containers]
elaborate: In a scheduler you know, which operation on its queue would need the underlying vector rather than only push, top and pop?
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
---

A timer queue must also list every pending timer for a status page and
drop all timers of a cancelled session at once.

```cpp
std::priority_queue<Timer, std::vector<Timer>, Later> pq;   // A
std::vector<Timer> v;                                        // B: kept a heap with
                                                             // std::push_heap / pop_heap
```

## Why does B fit these needs and A not?

---

**`priority_queue` hides its vector: only `push`, `top` and `pop` are public.**

With B you own the vector: iterate it, `erase_if` the cancelled
session's timers and `std::make_heap` once (O(n)), or `reserve` up
front. A would have to pop everything and push back what survives.
