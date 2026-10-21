---
id: ll-go-channel-batching
kind: basic
version: 2
level: 4
tags: [concurrency, queues, low-latency]
requires:
  - ll-go-channels
elaborate: What does batching cost the first item of each batch, and when would that latency matter more than the throughput?
refs:
  - https://en.cppreference.com/w/cpp/thread/mutex
  - https://sourceware.org/git/?p=glibc.git;a=blob;f=nptl/pthread_cond_signal.c
---

## A pipeline stage pushes 5 million small `Item`s a second through a mutex-protected queue, and the profile shows lock contention and thread wake-ups. What is the first change to make?

---

**Push `std::vector<Item>` batches instead of single items.**

One lock, one move of the vector and at most one notify then cover N
items, and the queue keeps its semantics and its back-pressure.
Replacing it with a lock-free ring is the later, costlier step.
