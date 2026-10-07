---
id: hashing-map-set-purpose
kind: basic
version: 1
level: 1
tags: [hashing, sets, maps]
requires:
  - complexity-big-o-scaling
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_set
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## A gateway checks each of a million requests against 50,000 banned user ids. With the ids in a `std::unordered_set`, what does one check cost on average?

```cpp
std::unordered_set<int> banned = load_banned();
if (banned.contains(user_id)) reject();
```

---

**O(1): the hash of `user_id` picks one bucket, and only that bucket is searched.**

No comparison against the other 49,999 ids, unlike a scan (O(n)) or a
sorted array (O(log n)). A `unordered_map` does the same with a value
stored beside each key.
