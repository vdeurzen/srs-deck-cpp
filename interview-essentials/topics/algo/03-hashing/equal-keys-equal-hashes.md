---
id: hashing-equal-keys-equal-hashes
kind: basic
version: 1
level: 1
tags: [hashing, hash-functions]
requires:
  - hashing-chaining
  - hashing-contract-direction
elaborate: Where in your own code do two types or functions each define "the same key" — a cache key, a map comparator, a dedup step — and could disagree?
refs:
  - https://en.cppreference.com/w/cpp/named_req/Hash
---

## The set holds `"Bob"`. Why does looking up `"bob"` fail here?

```cpp
std::string lower(std::string s);   // ASCII-lowercased copy
struct NameHash {   // std::hash of the string as written
  size_t operator()(const std::string& s) const { return std::hash<std::string>{}(s); }
};
struct NameEq {
  bool operator()(const std::string& a, const std::string& b) const { return lower(a) == lower(b); }
};
std::unordered_set<std::string, NameHash, NameEq> s{"Bob"};
s.contains("bob");   // false with GCC 16: buckets 4 and 11 of 13
```

---

**Equal keys must hash equally; these two don't, so the lookup searches the wrong bucket.**

The table compares keys only inside the bucket the hash picks. Breaking
the rule is undefined behaviour, so a lucky shared bucket may even
"work". The fix: hash `lower(s)`, so the hash sees what `NameEq` sees.
