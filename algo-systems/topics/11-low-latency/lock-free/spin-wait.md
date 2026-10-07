---
id: ll-spin-wait
kind: cloze
version: 1
level: 4
tags: [low-latency, concurrency, spinning, memory-hierarchy]
requires:
  - ll-false-sharing
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/exchange
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
elaborate: How long should a waiter spin before it parks, given what a context switch costs on your machine?
---

A spin lock whose waiters loop on `locked.exchange(true)` writes the
lock's cache line on every iteration, so the line bounces between the
waiting cores even while the holder makes no change. **Test-and-test-and-set**
spins on a plain {{c1::relaxed load::a kind of memory access}} instead, so every
waiter keeps a shared copy in its own cache, and tries the exchange only
after seeing the lock free.
