---
id: ordered-radix-trie
kind: basic
version: 1
level: 3
requires:
  - ordered-why-balance
tags: [tries, strings, databases]
refs:
  - https://en.wikipedia.org/wiki/Radix_tree
  - https://en.wikipedia.org/wiki/Trie
---

## What does a trie give you that a comparison tree cannot, and what does path compression fix?

---

A trie routes on the key's **symbols**, not on comparisons. Depth is the
length of the key, not log n, so lookup time is independent of how many
keys are stored — a million or a billion entries cost the same walk. It
also gives operations a comparison tree has no way to express: all keys
with a given prefix (one subtree), longest-prefix match (the deepest
node reached — the IP routing primitive), and lexicographic order for
free, since children are visited in symbol order.

The naive version is unusable: one node per symbol with 256 child slots
means a huge, mostly empty structure and one cache miss per *character*.
Two compressions fix it:

- **Path compression** (the radix tree/Patricia trie): a chain of
  single-child nodes collapses into one node holding the shared
  substring. Depth becomes proportional to the number of *branching*
  points, not the key length, so storing a handful of long URLs is a
  handful of nodes.
- **Node compression**: size the child array to the actual number of
  children instead of the alphabet. This is what ART does with its
  Node4/16/48/256 layouts.

Where tries beat hash tables outright: prefix and range queries, ordered
iteration, no need for a good hash, no rehash pause, and keys that share
long prefixes get stored once. Where they lose: a hash table is one or
two cache misses regardless of key length, while a trie is one per
level, and a trie's memory overhead is sensitive to the key
distribution in ways that are hard to predict.

The compiler-adjacent use is symbol and keyword lookup with prefix
queries (completion); the database uses are routing tables, in-memory
indexes (ART in HyPer/DuckDB), and key ranges in distributed stores.
