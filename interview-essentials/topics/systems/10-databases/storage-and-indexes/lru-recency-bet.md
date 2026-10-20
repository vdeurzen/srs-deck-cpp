---
id: db-lru-recency-bet
kind: basic
version: 1
level: 2
tags: [caching, databases]
requires:
  - lru-design-worked
elaborate: Where else would a repeated scan just larger than a cache wreck its hit rate, and what policy would survive it?
refs:
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
  - https://www.cs.cmu.edu/~christos/courses/721-resources/p297-o_neil.pdf
---

## A lookup that finds its key in the cache is a hit. A loop cycles over K + 1 distinct keys, again and again, through an LRU cache of K entries. What fraction of lookups hit?

---

**0 %: each access evicts exactly the key the loop needs next.**

LRU bets on temporal locality: recently used means soon used again. A
cyclic scan just larger than the cache breaks the bet; a database's page
cache read by one scan of a large table suffers the same way.
