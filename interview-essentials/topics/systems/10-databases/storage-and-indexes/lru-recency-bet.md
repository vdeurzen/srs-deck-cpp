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

## A full LRU cache evicts the entry unused for the longest. Which access pattern gives it a 0 % hit rate however long it runs?

---

**A loop over one more distinct key than the cache holds.** Each access
evicts exactly the key that the loop needs next.

LRU bets on temporal locality: recently used means soon used again. A
cyclic or sequential scan breaks the bet — the pattern behind a buffer
pool's sequential flooding.
