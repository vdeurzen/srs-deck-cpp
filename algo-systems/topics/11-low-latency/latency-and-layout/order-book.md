---
id: ll-order-book
kind: basic
version: 2
level: 5
tags: [low-latency, hft, data-structures, layout]
requires:
  - ll-freelist-pool
  - seq-intrusive-list
refs:
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
  - https://en.wikipedia.org/wiki/Order_book
elaborate: Count the cache lines your cancel touches. Which of them are writes into lines nothing else just touched?
---

## Cancel is a limit order book's most frequent message. Which two structures make it O(1) with no allocation?

---

**An order-id → order hash map, and an intrusive doubly-linked FIFO per
price level.** The map finds the order; the links inside the order unlink
it in O(1), and the FIFO keeps price-time priority. Orders come from a
pool, so nothing is allocated or freed. Four or five cache lines in all.
