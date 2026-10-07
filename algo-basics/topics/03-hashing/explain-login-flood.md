---
id: hashing-explain-login-flood
kind: explain
version: 1
level: 3
tags: [hashing, complexity, capstone]
requires:
  - hashing-average-vs-worst
  - hashing-cluster-worst-trace
refs:
  - https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
---
A web server keeps a hash map from request-parameter names to values.
One client sends requests with about 100,000 parameters each, and a
single such request takes seconds of CPU instead of milliseconds.
Explain what is happening and how you would fix it.
---
- [ ] Average O(1) per operation assumes the hash spreads keys evenly over the buckets
- [ ] The client chose names that all hash to one bucket, so each lookup or insert scans a chain (or probe run) holding every earlier key
- [ ] Inserting n such keys costs O(n²) in total: about 5·10⁹ comparisons for 10⁵ keys, which is seconds
- [ ] Fix: a randomly seeded hash, so the client cannot compute which names collide
- [ ] Also cap the number of parameters per request, since the damage grows with n²
