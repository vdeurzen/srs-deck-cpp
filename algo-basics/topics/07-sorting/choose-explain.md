---
id: sort-choose-explain
kind: explain
version: 2
level: 4
tags: [sorting, interview, trade-offs]
requires:
  - interview-essentials/sort-counting-idea
  - sort-lower-bound
  - interview-essentials/sort-compare-properties
  - sort-counting-code
elaborate: If the readings were 32-bit, how could a few stable passes, each over a few bits of the key, still sort them in linear time?
refs:
  - https://en.wikipedia.org/wiki/Counting_sort
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

A teammate must sort 10 million readings from a sensor that reports
12-bit values, 0 to 4 095. They ask which sort you would pick, and why.

---

- [ ] Counting sort: count how often each of the 4 096 values occurs, then write them out in order
- [ ] 12-bit keys allow only k = 4 096 distinct values, so one counter per value is cheap
- [ ] It never compares two keys, so the n log₂ n lower bound for comparison sorts does not apply
- [ ] About n + k ≈ 10⁷ steps, against roughly 2.3 · 10⁸ comparisons for an n log₂ n sort
- [ ] It needs O(n + k) extra memory, and 32-bit keys would need over 4 · 10⁹ counters
