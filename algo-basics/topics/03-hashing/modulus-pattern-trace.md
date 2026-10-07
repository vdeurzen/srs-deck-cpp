---
id: hashing-modulus-pattern-trace
kind: trace
version: 1
level: 2
tags: [hashing, hash-functions, tracing]
requires:
  - hashing-chaining
probes:
  1: { b10: "1" }
  2: { b7: "5" }
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/functional_hash.h
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/hashtable_policy.h
---

Order ids are handed out in steps of 10 and hashed as themselves (`h(k)
= k`). `distinct(m)` counts how many different buckets `k % m` the five
ids use.

```cpp
int ids[] = {10, 20, 30, 40, 50};

int distinct(int m) {
  bool used[16] = {};
  int d = 0;
  for (int k : ids) if (!used[k % m]) { used[k % m] = true; ++d; }
  return d;
}

int main() {
  int b10 = distinct(10);   // @1
  int b7  = distinct(7);    // @2
}
```

---

With 10 buckets every id lands in bucket 0: one chain of five. With 7
they land in 3, 6, 2, 5 and 1. **A bucket count sharing a factor with the
keys' stride collapses them into few buckets**; a prime count has no
factor to share.

This is real: libstdc++'s `std::hash<int>` is the identity, which is why
its `unordered_map` picks prime bucket counts (`_Prime_rehash_policy`).

(Values from running it under GCC 16.2.)
