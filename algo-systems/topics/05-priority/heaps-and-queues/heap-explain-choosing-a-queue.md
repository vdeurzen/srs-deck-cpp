---
id: heap-explain-choosing-a-queue
kind: explain
version: 1
level: 5
requires:
  - heap-bucket-queue
  - heap-timer-wheel-precise
  - heap-top-k-min-heap
tags: [heaps, queues, timers, selection]
refs:
  - https://doi.org/10.1145/363269.363610
  - https://doi.org/10.1145/41457.37504
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---
A routing service runs Dijkstra over a road graph whose edge weights are
whole seconds, at most 600. Its gateway sets a 30 s timeout per request,
almost always cancelled by the reply. A dashboard shows the 10 slowest
requests of each minute. Choose a priority structure for each of the
three and say what it saves over a plain binary heap.
---
- [ ] Routing: a bucket queue (Dial) of C + 1 = 601 circular buckets, because weights are small integers — O(1) push, a monotone cursor, no comparisons
- [ ] If a heap is kept anyway (larger C): lazy deletion instead of `decrease_key` — push a fresh entry, skip pops with `d > dist[v]` — with a 4-ary layout for the push-heavy mix
- [ ] Gateway: a timing wheel with intrusive per-request nodes, because schedule and cancel are O(1) and almost no timer ever fires
- [ ] The event loop's wake-up: the wheel's tick (or a small heap of the few precise deadlines) gives the poll timeout, since a wheel alone does not know the exact next expiry
- [ ] Dashboard: a size-10 **min**-heap per minute, compared against its root, so O(n log 10) time and O(10) memory in one pass over the stream
