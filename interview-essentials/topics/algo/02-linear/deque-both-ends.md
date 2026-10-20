---
id: linear-deque-both-ends
kind: basic
version: 3
level: 2
tags: [containers, queues]
requires:
  - linear-queue-ring
  - linear-sequence-containers
elaborate: "What would change your answer: name the requirement that would make `std::deque` the better choice."
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container/queue
---

## An editor keeps exactly the last 100 actions: a new action goes in at one end, and once 100 are held, the oldest drops off the other. The undo menu reads the k-th most recent directly. Ring buffer of 100 slots or `std::deque`?

---

**A ring buffer: the capacity is fixed, so it never needs to grow.**

Both give O(1) at both ends and O(1) reads by position. The ring is one
array allocated once; elements never move. A deque can grow, so in practice it
allocates and frees blocks as actions flow through. The ring gives up
growing past 100.
