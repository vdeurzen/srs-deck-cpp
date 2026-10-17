---
id: db-lru-recency-bet
kind: basic
version: 1
level: 2
tags: [caching, databases]
refs:
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
  - https://www.cs.cmu.edu/~christos/courses/721-resources/p297-o_neil.pdf
---

## A loop cycles over K + 1 distinct keys, again and again, through an LRU cache of K entries (LRU evicts the entry unused for the longest). What hit rate does it get?

---

**0 %: each access evicts exactly the key the loop needs next.**

LRU bets on temporal locality: recently used means soon used again. A
cyclic scan just larger than the cache breaks the bet; a database buffer
pool hit by a large table scan suffers the same way.
