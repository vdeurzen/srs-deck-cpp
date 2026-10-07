---
id: ll-order-book-levels
kind: basic
version: 1
level: 5
tags: [low-latency, hft, data-structures, layout]
requires:
  - ll-order-book
refs:
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
---

## Why do fast order books index price levels with an array of ticks instead of a `std::map<Price, Level>`?

---

**Prices are discrete and live in a narrow band around the touch, so
`(price − base) / tick` is a direct index.** That is O(1) with no
comparisons, no rebalancing, no node allocation, and neighbouring levels
share cache lines. A map remains the fallback for far-away or unbounded
prices.
