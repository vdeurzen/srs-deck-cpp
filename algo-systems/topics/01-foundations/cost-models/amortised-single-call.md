---
id: foundations-amortised-single-call
kind: basic
version: 1
level: 2
tags: [complexity, amortised, low-latency]
requires:
  - foundations-amortised-vs-average
elaborate: Which hot path of yours appends to a vector? Would `reserve` or a fixed ring buffer remove its slowest call?
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

## A hot path has a p99.9 budget and calls `v.push_back(x)` on a `std::vector` holding a million elements. What does "amortised O(1)" promise about this one call?

---

**Nothing: if it reallocates, this call moves all million elements, O(n).**
The amortised bound is about the *sum* over a sequence; the cheap pushes
before it paid for it. A tail-latency budget is about single calls, so
`reserve` up front or use a structure with a per-operation worst case.
