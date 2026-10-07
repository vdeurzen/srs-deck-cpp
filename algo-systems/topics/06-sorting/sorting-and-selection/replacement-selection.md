---
id: sort-replacement-selection
kind: basic
version: 1
level: 5
tags: [sorting, databases, heaps]
requires:
  - sort-external-merge
  - heap-vocabulary
elaborate: What do runs look like when the input is already sorted, or exactly reversed?
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

## Run generation keeps a heap of M records and repeatedly emits the smallest one ≥ the last emitted (replacement selection). What does that change?

---

**Runs average 2M on random input instead of M, so half as many runs.**

Each emitted record is replaced by the next input; one smaller than the
last output waits for the next run, the rest extend this one (Knuth's
snowplow argument). Worth it when halving the runs saves a merge pass.
