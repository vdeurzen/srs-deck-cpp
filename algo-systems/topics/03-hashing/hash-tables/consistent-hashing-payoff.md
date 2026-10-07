---
id: hash-consistent-hashing-payoff
kind: basic
version: 1
level: 4
tags: [hashing, distributed, databases]
requires:
  - hash-modulo-remap
refs:
  - https://dl.acm.org/doi/10.1145/258533.258660
  - https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf
---

## Consistent hashing puts keys and node tokens on one ring; a key belongs to the first token at or after it. Node 1 of 3 leaves. Which keys move?

---

**Only node 1's keys, each to the next token along the ring.**
Every other key still finds the same first token. Each node holds many
tokens (virtual nodes), so its share of the ring is even and the moved
keys spread over all survivors. Dynamo and Cassandra partition this way.
