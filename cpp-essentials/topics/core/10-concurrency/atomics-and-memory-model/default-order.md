---
id: atomics-default-order
kind: basic
version: 1
level: 2
tags: [concurrency, atomics, memory-model]
requires:
  - atomics-memory-order-intro
elaborate: Say in one sentence, as to an interviewer, when you would leave an atomic on its default order and when you would weaken it.
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order#Sequentially-consistent_ordering
  - https://eel.is/c++draft/atomics.order#4
---

```cpp
std::atomic<bool> ready{false};
ready.store(true);         // no order argument
bool r = ready.load();     // no order argument
```

## Which memory order do these calls use?

---

**`std::memory_order_seq_cst`, sequentially consistent: the default and the strongest.**

It gives everything release and acquire give, plus one single order of
all `seq_cst` operations that every thread agrees on. It is the safe
default; weaker orders are an optimisation, since a `seq_cst` store can
cost a full fence on x86.
