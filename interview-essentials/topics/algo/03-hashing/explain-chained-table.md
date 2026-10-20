---
id: hashing-explain-chained-table
kind: explain
version: 2
level: 2
tags: [foundations, chaining, capstone]
requires:
  - hashing-direct-address-limit
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
- [ ] Problem: an array indexed by the id itself needs 2⁶⁴ slots, so direct addressing is out
- [ ] Mechanism: keep m buckets and send id k to bucket h(k) mod m, whose chain holds it
- [ ] Example: with m = 8, ids 42 and 50 both land in bucket 2 and share its chain
- [ ] Cost: a lookup scans one chain, about n / m ids, so growing m with n keeps it O(1)
- [ ] Pitfall: ids that all hash to one bucket turn every lookup into a scan of all n
