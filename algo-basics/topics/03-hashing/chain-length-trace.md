---
id: hashing-chain-length-trace
kind: basic
version: 2
level: 2
tags: [foundations, chaining, load-factor]
requires:
  - interview-essentials/hashing-load-factor
elaborate: Say in one sentence, as to an interviewer, what assumption hides inside "a hash lookup is O(1)".
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2
---

A chained table keeps its bucket count fixed at 4, and its hash spreads
keys evenly. It grows from 12 keys to 12 000.

## How does the cost of an average unsuccessful lookup change?

---

**It grows 1 000×, from about 3 compares to about 3 000.**

A lookup hashes once, then scans one chain of about α = n / m keys:
O(1 + α). That is constant only while m grows with n, which is why real
tables add buckets as they fill.
