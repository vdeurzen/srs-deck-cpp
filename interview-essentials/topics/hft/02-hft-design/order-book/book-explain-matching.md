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
- [ ] An incoming order trades when its limit crosses the best opposite price; otherwise it rests in the book
- [ ] An incoming order trades level by level from the best price while lots remain and its limit allows
- [ ] Each fill is at the resting order's price, not at the incoming order's limit
- [ ] Best price fills first, and at one price the oldest resting order fills first
