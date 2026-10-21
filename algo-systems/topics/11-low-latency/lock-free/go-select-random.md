---
id: ll-go-select-random
kind: basic
version: 2
level: 3
tags: [concurrency, locks, fairness]
requires:
  - cpp-essentials/conc-mutex-takes-turns
elaborate: Where would a starved thread hurt you, and what would you put in place of the mutex to give it a turn?
refs:
  - https://eel.is/c++draft/thread.mutex.requirements.mutex.general
  - https://en.cppreference.com/w/cpp/thread/mutex
---

## Thread A blocks on a locked `std::mutex`, then thread B blocks on it too. When the owner unlocks, which of them acquires it next?

---

**Either: `std::mutex` promises no order or fairness among waiters.**

The standard leaves it unspecified, and on Linux a woken waiter races
any thread that arrives at that moment, so a newcomer can win and a
waiter can starve. Need turns? Hand the work out through a FIFO queue.
