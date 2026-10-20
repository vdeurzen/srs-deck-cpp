---
id: book-match-worked
kind: basic
version: 1
level: 2
tags: [hft, order-book, matching, worked-example]
requires:
  - book-trade-price
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://en.wikipedia.org/wiki/Order_book
---

Resting asks: 5 lots at price 3, 2 lots at 4, 10 lots at 6. A buy of 9
lots with limit 4 arrives. The matcher trades at the best (lowest) ask
while lots remain, then moves the best ask up past empty prices.

| step | best ask | traded | left to buy |
| --- | --- | --- | --- |
| arrive | 3 | — | 9 |
| trade at 3 | 3, empties, → 4 | 5 | 4 |
| trade at 4 | 4, empties, → 6 | 2 | 2 |
| check | 6 | — | 2 |

## Why does matching stop with 2 lots unfilled, though 10 lots are offered at 6?

---

**The best ask, 6, is above the buy's limit of 4.**

A limit buy accepts any price at or below its limit, never above. The
2 unfilled lots join the bids at 4 and wait there as a resting order.
