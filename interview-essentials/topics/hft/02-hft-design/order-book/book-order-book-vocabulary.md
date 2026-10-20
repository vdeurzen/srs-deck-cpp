---
id: book-order-book-vocabulary
kind: basic
version: 1
level: 1
tags: [foundations, hft, order-book, vocabulary]
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://en.wikipedia.org/wiki/Order_book
---

## A limit order offers to buy or sell some lots at its limit price or better; unmatched ones wait in the book. Which new order trades on arrival?

```
book    side         price  lots
        sell (ask)    102    5
        sell (ask)    101    3     best ask
        buy  (bid)    100    2     best bid
        buy  (bid)     99    4

new:  buy 2 @ 100    sell 1 @ 101    buy 1 @ 101
```

---

**Buy 1 @ 101, the aggressor: it reaches the best ask; the others rest.**

An order trades when its limit crosses the best price on the other
side. The other two only join their own side and wait as resting
orders. At one price, the earliest resting order fills first:
price-time priority.
