---
id: ll-tail-latency
kind: basic
version: 1
level: 4
tags: [low-latency, measurement, distributed]
requires:
  - ll-measurement
refs:
  - https://dl.acm.org/doi/10.1145/2408776.2408794
---

## Why do low-latency teams quote p99.9 instead of the mean?

---

**Because what users experience is set by the slow requests, which the
mean hides.** Two systems with the same mean can have p99.9s at 2× and
200× it. For a trading path the bad case is the requirement: report
p99.9 and the max.
