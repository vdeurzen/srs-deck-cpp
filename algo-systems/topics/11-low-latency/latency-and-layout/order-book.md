---
id: ll-order-book
kind: basic
version: 1
level: 5
tags: [low-latency, hft, data-structures, layout]
refs:
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
  - https://en.wikipedia.org/wiki/Order_book
---

## Design a limit order book. Which structure per operation, and what makes the common case O(1)?

---

The operations and their frequencies are the design input: **add**,
**cancel** (the most frequent by far — most orders are cancelled, not
filled), **execute/match**, and **query best bid/offer** (on every
event).

The standard layout is three structures:

- **Price levels: an array indexed by price ticks**, not a tree.
  Prices are discrete (`(price − base) / tick_size`), the live range is
  narrow around the touch, so an array gives O(1) access to a level
  with no comparisons, no rebalancing and perfect locality. A map or
  skip list is the fallback for instruments with a huge or unbounded
  price range; many books keep a dense array near the touch and a map
  for far-away levels.
- **Orders within a level: an intrusive doubly-linked FIFO**, which
  gives price–time priority for free and O(1) unlink on cancel — with
  no allocation, since the node lives inside the order object.
- **Order id → order: an open-addressed hash map** (or a slab indexed
  by a handle, if you allocate the ids). Cancel is: hash the id, follow
  the pointer, unlink, decrement the level's aggregate — all O(1), and four or five
  lines: the bucket, the order, its two list neighbours, and the
  level. The two neighbour stores are writes into lines nothing else
  just touched, which is why keeping neighbours pool-adjacent is worth
  the effort.

The remaining trick is the **best bid/offer**: cache the current best
level index and move it only when a level empties or a better one
appears. Then the query every event asks is a load, not a search.

Everything else follows the same discipline as the rest of this
Topic: pre-allocate orders from a pool (never `new` in the hot path),
keep the level's aggregate quantity incrementally updated rather than
summing the list, pad the hot fields into their own cache lines, and
keep the whole book in one arena so it can be snapshotted and replayed.

The measurable win over the naive `map<price, list<order>>` is an order
of magnitude, and almost all of it is cache behaviour — the naive
version does a red-black traversal and a list allocation on the
critical path of every message.
