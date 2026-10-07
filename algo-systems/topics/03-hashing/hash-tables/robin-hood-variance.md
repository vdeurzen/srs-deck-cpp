---
id: hash-robin-hood-variance
kind: basic
version: 1
level: 4
requires:
  - hash-robin-hood
tags: [hashing, open-addressing, low-latency]
refs:
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
  - https://programming.guide/robin-hood-hashing.html
elaborate: Is your latency budget written against the mean lookup or the p99.9? Which would Robin Hood move?
---

## Robin Hood hashing leaves the *average* probe length of linear probing unchanged. So why use it?

---

**It cuts the variance: the longest probe runs shrink, so the tail lookup is short.**

Plain linear probing leaves a few keys very far from home. Robin Hood
takes slots from keys near home to give to those far away, so the maximum
PSL stays small even at high load: what matters when the metric is p99.9.
