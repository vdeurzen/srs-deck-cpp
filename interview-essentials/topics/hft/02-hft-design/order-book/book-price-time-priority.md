---
id: book-price-time-priority
kind: basic
version: 1
level: 2
tags: [hft, order-book, matching]
requires:
  - book-order-book-vocabulary
elaborate: Say to an interviewer which data structure keeps the orders at one price in arrival order, and what a cancel in the middle of it costs.
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://en.wikipedia.org/wiki/Order_book
---

```
resting asks at 101:   A: 3 lots (arrived first)
                       B: 2 lots (arrived second)
new:                   buy 4 @ 101
```

## On a typical equities exchange, how many lots does B fill?

---

**1: A fills all 3 lots first, then B gets the remaining 1.**

At one price, the earliest resting order fills first: **price-time
priority** (FIFO). Better price always wins; arrival time only breaks
ties within a price. Some futures markets split by size instead (pro
rata).
