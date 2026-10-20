---
id: linear-deque-both-ends
kind: cloze
version: 2
level: 2
tags: [containers, queues]
requires:
  - linear-queue-ring
  - linear-sequence-containers
elaborate: "When would a fixed-capacity ring buffer beat `std::deque` for this history, and what would it give up?"
refs:
  - https://en.cppreference.com/w/cpp/container/deque
---

An editor keeps the last 100 actions: each new action is added at one end
and, when the history is full, the oldest is dropped from the other. The
undo menu also reads the k-th most recent action directly. `std::vector`
drops its oldest in O(n); the standard container that does all three in
O(1) is {{c1::std\::deque::a container}}.

---

A deque (double-ended queue) gives O(1) at both ends plus O(1)
indexing. `std::list` has the ends but walks k nodes to reach index k.
A ring buffer gives the same two O(1) ends when the capacity is fixed.
