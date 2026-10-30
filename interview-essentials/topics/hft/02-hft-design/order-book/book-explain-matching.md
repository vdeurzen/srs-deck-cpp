---
id: book-explain-matching
kind: explain
version: 2
level: 4
tags: [hft, order-book, matching, interview]
requires:
  - book-order-book-vocabulary
  - book-trade-price
  - book-match-worked
  - book-match-cross
  - book-price-time-priority
elaborate: Say aloud how you would store the price levels so the best one is reached directly, and what that costs when most ticks are empty.
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
  - https://en.wikipedia.org/wiki/Order_book
---
An interviewer on a trading team asks how a matching engine handles an
incoming limit order. Answer aloud.
---
- [ ] An order trades when its limit crosses the best opposite price; otherwise it rests in the book
- [ ] It trades level by level from the best price while lots remain and the price stays within its limit
- [ ] Asks 5 at 3, 2 at 4, 10 at 6: a buy of 9 at 4 fills 7, rests 2
- [ ] Each fill is at the resting order's price, not at the incoming order's limit
- [ ] Best price fills first, and at one price the oldest resting order fills first
