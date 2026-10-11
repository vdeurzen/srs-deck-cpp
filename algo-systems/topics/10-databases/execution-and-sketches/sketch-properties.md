---
id: db-sketch-properties
kind: cloze
version: 1
level: 4
tags: [databases, sketches, probabilistic]
requires:
  - db-count-min-sketch
  - db-hyperloglog
refs:
  - https://datasketches.apache.org/
---

Match the sketch to the question. Membership, with a certain "not
present": {{c2::a Bloom filter}}. Number of distinct values:
{{c3::HyperLogLog}}. How often one key occurred, never
underestimated: {{c4::a count-min sketch}}. Quantiles: a t-digest or KLL sketch. Set similarity:
MinHash.
