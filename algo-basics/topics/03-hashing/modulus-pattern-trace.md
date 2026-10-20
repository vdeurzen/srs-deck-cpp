---
id: hashing-modulus-pattern-trace
kind: basic
version: 2
level: 2
tags: [hashing, hash-functions]
requires:
  - interview-essentials/hashing-chaining
elaborate: Where do real keys arrive with a fixed step (ids, addresses, timestamps), and which bucket counts would you avoid for them?
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/functional_hash.h
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/hashtable_policy.h
---

Order ids come in steps of 10 (10, 20, 30, 40, 50) and are hashed as
themselves, `h(k) = k`, into bucket `k % m`.

## Which bucket count m spreads these five ids over the most buckets: 10, 15 or 7?

---

**7: it shares no factor with the step 10, so all five buckets differ.**

With 10 every id lands in bucket 0; with 15, sharing the factor 5, only
in 10, 5 and 0. libstdc++'s `std::hash<int>` is the identity, so its
`unordered_map` uses prime bucket counts, which share no factor.
