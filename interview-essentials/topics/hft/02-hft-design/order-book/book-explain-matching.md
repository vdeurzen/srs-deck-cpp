---
id: book-explain-matching
kind: explain
version: 1
level: 4
tags: [hft, order-book, matching, interview]
requires:
  - book-order-book-vocabulary
  - book-trade-price
  - book-match-worked
  - book-match-cross
elaborate: Say aloud what changes in this design when prices can span thousands of ticks and most of them are empty.
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://en.wikipedia.org/wiki/Order_book
---
An interviewer on a trading team asks how a matching engine handles an
incoming limit order. Answer aloud.
---
- [ ] Problem: an order whose limit crosses the best opposite price trades now; others rest in the book
- [ ] Mechanism: trade at the best level while lots remain and it is within the limit, then rest the rest
- [ ] Example: asks 5 at 3, 2 at 4, 10 at 6; a buy of 9 at 4 fills 7 and rests 2
- [ ] Cost: levels in an array indexed by price tick are reached directly; empty ticks are stepped over
- [ ] Pitfall: each fill is at the resting order's price, not at the incoming order's limit
