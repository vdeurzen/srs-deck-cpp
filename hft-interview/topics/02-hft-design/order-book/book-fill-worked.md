---
id: book-fill-worked
kind: basic
version: 1
level: 3
tags: [hft, order-book, matching, worked-example]
requires:
  - interview-essentials/book-trade-price
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
---

On a FIFO venue a buy for 4 lots hits one ask price, whose queue is,
front to back, A (3 lots), B (2 lots), C (4 lots). Each step trades
with the front order.

```
front  its lots  traded  buy still wants  then
A      3         3       1                A filled: leaves
B      2         1       0                B keeps 1, stays front
```

## Row 2: why does B stay at the front instead of going to the back?

---

**A partial fill keeps its time priority: B still arrived before C.**

Only a fully filled order leaves the queue. Sending B's remaining lot
behind C would punish it for being traded with, and the next buyer at
this price trades with B first.
