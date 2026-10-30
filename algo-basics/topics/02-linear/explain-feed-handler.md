---
id: linear-explain-feed-handler
kind: explain
version: 2
level: 3
tags: [linear, capstone]
requires:
  - linear-ring-full-empty-trace
  - linear-sliding-window-code
  - linear-prefix-sum-code
elaborate: In the ring of the last 100 ticks, how do you tell a full buffer from an empty one when `head == tail` in both?
refs:
  - https://en.cppreference.com/w/cpp/container/queue
  - https://en.wikipedia.org/wiki/Prefix_sum
---
A price-feed handler must show the average of the last 100 ticks after
each new tick, and after the close answer thousands of "total volume
between tick i and tick j" queries over the day's ticks. Choose a linear
structure or technique for each part and justify its cost to a teammate.
---
- [ ] The last 100 ticks sit in a fixed ring buffer: dropping the oldest advances an index, shifting nothing
- [ ] The average uses a running sum: add the entering tick, subtract the leaving one, O(1) per tick
- [ ] Summing each queried range with a loop would cost up to a whole day's ticks per query
- [ ] Instead, build prefix sums once, in one O(n) pass over the day
- [ ] Each query is then `p[j] - p[i]` over the half-open range, O(1); `p[0] = 0` covers ranges from the start
