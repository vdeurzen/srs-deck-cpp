---
id: hashing-explain-chained-table
kind: explain
version: 2
level: 2
tags: [foundations, chaining, capstone]
requires:
  - hashing-chain-lookup-code
  - hashing-index-mod-trace
  - hashing-load-factor
  - hashing-average-vs-worst
elaborate: "When would you pick open addressing instead for this set, and what would you say differently about its cost?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
  - https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
---
A set of a million 64-bit ids must answer "is id k present?" in
constant time on average. Explain to an interviewer how a hash table
with chaining achieves that.
---
- [ ] Keep m buckets and send id k to bucket h(k) mod m
- [ ] Ids landing in one bucket share its chain, which a lookup searches for k
- [ ] A lookup scans one chain of about n / m ids
- [ ] Growing m with n keeps n / m constant, so a lookup is O(1) on average
- [ ] (empty: tick this)
