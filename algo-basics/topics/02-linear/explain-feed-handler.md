---
id: linear-explain-feed-handler
kind: explain
version: 1
level: 3
tags: [queues, sliding-window, prefix-sums, capstone]
requires:
  - linear-ring-full-empty-trace
  - linear-sliding-window-code
  - linear-prefix-sum-code
refs:
  - https://en.cppreference.com/w/cpp/container/queue
  - https://en.wikipedia.org/wiki/Prefix_sum
---
A price-feed handler must show the average of the last 100 ticks after
each new tick, and after the close answer thousands of "total volume
between tick i and tick j" queries over the day's ticks. Choose a linear
structure or technique for each part and justify its cost.
---
- [ ] The last 100 ticks sit in a fixed ring buffer, so dropping the oldest advances an index instead of shifting 99 elements
- [ ] The ring keeps a count (or a spare slot), because `head == tail` both when full and when empty
- [ ] The average comes from a running sum that adds the entering tick and subtracts the leaving one: O(1) per tick, not O(100)
- [ ] Range totals use prefix sums, built once in a single O(n) pass over the day
- [ ] Each query is then `p[j] - p[i]` over the half-open range, O(1), with `p[0] = 0` so ranges from the start need no special case
