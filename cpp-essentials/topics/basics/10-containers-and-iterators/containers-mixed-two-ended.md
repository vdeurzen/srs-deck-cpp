---
id: containers-mixed-two-ended
kind: basic
version: 1
level: 2
tags: [containers, recognition]
requires:
  - deque-basics
elaborate: Say which other structure you would reach for if jobs also had to come out in priority order, and why.
refs:
  - https://en.cppreference.com/w/cpp/container/deque
---

## A job list takes urgent jobs at the front and normal jobs at the back, and workers read it by index. Which standard container fits?

---

**A `std::deque` of jobs: it adds at both ends cheaply and still indexes.**

The cue is "adds at the front". A `std::vector` appends cheaply but
inserting at its front shifts every element; `deque` keeps both ends cheap
while `d[i]` still works.
