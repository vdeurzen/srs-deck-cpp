---
id: linear-explain-dynamic-array-growth
kind: explain
version: 1
level: 3
tags: [arrays, dynamic-arrays, amortised, interview]
requires:
  - linear-dynamic-array-growth
  - complexity-amortised-single-call
  - complexity-cost-geometric-sum
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (dynamic tables)
elaborate: Say what this bound promises about the slowest single `push_back` on a latency-critical path, and what you would do about it.
---

An interviewer says `std::vector::push_back` is O(1), then asks how that
can be true when a full vector must transfer every element to a new
buffer. Answer them.

---

- [ ] A single `push_back` on a full vector costs O(n); the O(1) is amortised, a bound over many pushes
- [ ] Any n pushes cost O(n) in total, so the cost per push averages to a constant
- [ ] Capacity grows by a factor such as ×2, so reallocations get rarer as the vector grows
- [ ] Doubling transfers at most 1 + 2 + 4 + … < 2n elements over n pushes
- [ ] Growing by a fixed 10 slots would transfer about n²/20 elements, so each push would pay O(n)
