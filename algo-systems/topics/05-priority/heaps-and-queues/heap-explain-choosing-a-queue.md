---
id: heap-explain-choosing-a-queue
kind: explain
version: 2
level: 5
requires:
  - heap-bucket-queue
  - heap-timer-wheel-slot
  - heap-top-k-bounded
tags: [heaps, queues, timers, selection]
elaborate: The gateway's event loop must arm one timer for the exact next deadline. Why is the wheel alone not enough, and what would you add?
refs:
  - https://doi.org/10.1145/363269.363610
  - https://doi.org/10.1145/41457.37504
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---
An interviewer asks: a routing service runs Dijkstra over a road graph
whose edge weights are whole seconds, at most 600. Its gateway sets a
30 s timeout per request, almost always cancelled by the reply. A
dashboard shows the 10 slowest requests of each minute. Which priority
structure would you use for each, and what does it save over a plain
binary heap?
---
- [ ] Routing: a bucket queue of 601 circular buckets, because the weights are small integers
- [ ] Its pushes are O(1) appends and its pops advance a monotone cursor, with no comparisons
- [ ] Gateway: a timing wheel, which schedules and cancels each timeout in O(1) by bucket index and unlink
- [ ] A heap would pay O(log n) twice per timeout, though almost none ever fires
- [ ] Dashboard: a size-10 min-heap compared at its root: O(n log 10) time, O(10) memory, one pass
