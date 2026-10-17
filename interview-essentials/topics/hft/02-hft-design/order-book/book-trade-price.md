---
id: book-trade-price
kind: basic
version: 1
level: 3
tags: [hft, order-book, matching, misconception]
requires:
  - book-match-cross
refs:
  - https://sec.gov/files/rules/sro/byx/2011/34-64476-ex5.pdf
elaborate: "In your matcher, which variable holds the trade price when you emit a fill, the aggressor's limit or `best`?"
---

## On a continuous price-time-priority venue, your limit buy at 6 arrives and hits a resting ask at 4. At what price do you trade?

---

**At 4, the resting order's price.** A limit is the worst price you
accept, not the price you pay; the resting order set the price first,
so the aggressor gets the improvement. BYX Rule 11.13 (2011 text): an incoming
buy executes "at the price(s) of the lowest order(s) to sell". A
matcher prints fills at `best`.
