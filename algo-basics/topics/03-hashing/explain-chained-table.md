---
id: hashing-explain-chained-table
kind: explain
version: 1
level: 2
tags: [foundations, chaining, capstone]
requires:
  - hashing-direct-address-limit
  - hashing-chained-lookup-code
  - hashing-chain-length-trace
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
---
A set of a million 64-bit ids must answer "is id k present?" in
constant time on average. Explain how a hash table with chaining
achieves that.
---
- [ ] An array indexed by the id itself would be O(1) but needs a slot per possible id (2⁶⁴), so it is out
- [ ] The table keeps m buckets and sends k to bucket `h(k) mod m`, so any key gets a small index
- [ ] More possible keys than buckets means collisions are unavoidable, so each bucket holds a chain of its keys
- [ ] A lookup recomputes the bucket and compares k with `==` against that one chain only
- [ ] With keys spread evenly the expected chain length is n / m (the load factor), so growing m with n keeps a lookup O(1) on average
