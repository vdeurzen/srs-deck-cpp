---
id: heap-lazy-deletion
kind: basic
version: 2
level: 4
requires:
  - heap-decrease-key-handle
tags: [heaps, graphs, idioms]
elaborate: A timer queue cancels by flagging the timer; an event loop supersedes a callback by pushing a newer one. Where else does "mark it, skip it on pop" replace finding it?
refs:
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue
  - https://en.cppreference.com/w/cpp/container/priority_queue
---

## `std::priority_queue` has no `decrease_key`. How does Dijkstra work anyway?

---

**Push a fresh `(dist, v)`; on pop, skip any entry whose distance exceeds `dist[v]`.**

The old entry stays in the queue as garbage. The array `dist` is the
truth, so a popped entry larger than it is stale — superseded by a later
push — and is discarded without relaxing its edges. No handle into the
heap is ever needed.
