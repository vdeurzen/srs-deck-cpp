---
id: complexity-feasible-n
kind: cloze
version: 1
level: 1
tags: [complexity, estimation]
requires:
  - complexity-growth-ladder
refs:
  - https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities
---

Assume about 10⁸ simple steps per second. A one-second budget then
covers n ≈ 10⁸ for O(n), n ≈ 4·10⁶ for O(n log n),
n ≈ {{c1::10⁴}} for O(n²), and only
n ≈ {{c2::26}} for O(2ⁿ).

---

Solve cost(n) = 10⁸: √10⁸ = 10⁴, and 2²⁶ ≈ 6.7·10⁷ while 2²⁷ ≈ 1.3·10⁸.
The rate is a rough rule of thumb, but the shape is the lesson: each class
up the ladder shrinks the feasible n by orders of magnitude, so reading a
problem's n tells you which class of algorithm it needs.
