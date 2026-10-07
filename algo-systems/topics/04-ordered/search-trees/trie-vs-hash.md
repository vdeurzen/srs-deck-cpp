---
id: ordered-trie-vs-hash
kind: basic
version: 1
level: 3
tags: [tries, hashing, memory-hierarchy]
requires:
  - ordered-radix-trie
elaborate: Your symbol table later needs completion ("all identifiers starting with `get`"). Which structure now, and what does the switch cost?
refs:
  - https://doi.org/10.1145/367390.367400
  - https://abseil.io/docs/cpp/guides/container
---

## A symbol table of long identifiers does only exact-match lookups. Trie or hash table?

---

**Hash table: one or two cache misses, against roughly one per trie level.**

Hashing reads the key once, sequentially. A trie pays a dependent pointer
hop per level, even path-compressed. A trie wins only when you need what
hashing destroys: prefix queries, ordered iteration, longest-prefix
match.
