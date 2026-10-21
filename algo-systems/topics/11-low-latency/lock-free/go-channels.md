---
id: ll-go-channels
kind: basic
version: 2
level: 4
tags: [concurrency, queues, low-latency]
elaborate: In a service you know, which queue is on the hot path, and does its consumer usually keep up or usually sleep?
requires:
  - ll-go-blocking-basics
refs:
  - https://sourceware.org/git/?p=glibc.git;a=blob;f=nptl/pthread_cond_signal.c
  - https://en.cppreference.com/w/cpp/thread/condition_variable/notify_one
---

## A producer pushes into a `std::mutex` + `std::condition_variable` queue. The consumer always keeps up, so it is almost never asleep and the two rarely meet on the lock. What does each push cost?

---

**An uncontended lock and unlock, one copy, and a `notify_one` that finds no waiter.**

With nobody waiting, glibc's `notify_one` returns without a system call.
Only when the consumer is actually asleep on an empty queue does a push
pay a wake-up in the kernel: a system call and often a cross-core wake-up.
