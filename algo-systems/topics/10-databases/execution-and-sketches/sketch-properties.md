---
id: db-sketch-properties
kind: cloze
version: 1
level: 4
tags: [databases, sketches, probabilistic]
refs:
  - https://datasketches.apache.org/
  - https://en.wikipedia.org/wiki/Streaming_algorithm
---

The sketches share a shape worth naming once. Each answers a question
in **sublinear** space with a bounded error, and each is
{{c1::mergeable::two sketches of two streams combine into the sketch of
the concatenation}} — which is what lets a distributed system compute
one per shard and combine them later, and lets a time-series system
keep one per minute and roll them up.

Match the structure to the question. Membership, one-sided "definitely
not present": {{c2::a Bloom filter::or a cuckoo filter, if deletion is
needed}}. Distinct count: {{c3::HyperLogLog::error 1.04/√m, registers
merged by taking the maximum}}. Frequency of a given key, never
underestimated: {{c4::a count-min sketch::rows merged by addition,
queried by taking the minimum}}. Quantiles and medians: a t-digest or
KLL sketch. Set similarity: MinHash.

Two cautions apply to all of them. The error is stated
{{c5::probabilistically::"within ε with probability 1 − δ", so a bad
run is possible, not impossible}}, so a system that must never be wrong
uses a sketch to *avoid work*, not to produce the answer — a Bloom
filter in front of an exact lookup, a count-min in front of an exact
count for the candidates it surfaces. And composition is where naive
use goes wrong: subtracting two approximate cardinalities, or feeding
one sketch's output into another's input, multiplies the error in ways
the individual bounds do not cover.
