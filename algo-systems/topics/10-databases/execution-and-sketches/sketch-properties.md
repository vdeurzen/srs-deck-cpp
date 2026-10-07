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
present": {{c2::a Bloom filter::a filter}}. Number of distinct
values: {{c3::HyperLogLog::a cardinality sketch}}. How often one key
occurred, never underestimated: {{c4::a count-min sketch::a frequency sketch}}. Quantiles: a t-digest or KLL sketch. Set similarity:
MinHash.
