---
id: hashing-explain-login-flood
kind: explain
version: 2
level: 3
tags: [hashing, complexity, capstone]
requires:
  - interview-essentials/hashing-average-vs-worst
  - hashing-cluster-worst-trace
  - interview-essentials/tree-hostile-keys-mixed
elaborate: What would a hash seeded randomly at startup change for this client, and why might you still cap the parameters per request?
refs:
  - https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
---
A web server keeps a hash map from request-parameter names to values.
One client sends requests with about 100,000 parameters each, and a
single such request takes seconds of CPU instead of milliseconds.
Explain to a colleague what is happening and how you would fix it.
---
- [ ] Average O(1) per operation assumes the hash spreads the keys evenly over the buckets
- [ ] The client picked names that all hash to one bucket, so each insert scans every earlier key
- [ ] So n inserts cost O(n²) in total: about 5·10⁹ comparisons for 10⁵ names, which is seconds
- [ ] Switch to a balanced tree such as `std::map`: O(log n) per insert, whatever names the client picks
- [ ] That is about 10⁵ · 17 ≈ 2·10⁶ comparisons per request: milliseconds again
