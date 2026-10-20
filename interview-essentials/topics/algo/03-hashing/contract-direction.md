---
id: hashing-contract-direction
kind: basic
version: 1
level: 1
tags: [foundations, hash-functions]
elaborate: "If you wrote a hash function for a struct of two ints, which mistake would break lookups and which would only slow them?"
refs:
  - https://en.cppreference.com/w/cpp/named_req/Hash
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2
requires:
  - hashing-chaining
---

## A word table's hash function gives `h("cat") == h("tub")`. Is that hash function broken?

---

**No: only equal keys must hash equally, so sharing a hash value is allowed.**

A shared hash value puts both words in one bucket, and the table tells them
apart by comparing keys with `==`. That costs time, not correctness.
The broken case is the reverse: equal keys with different hash values send
a lookup to the wrong bucket.
