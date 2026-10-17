---
id: hashing-equal-keys-equal-hashes
kind: basic
version: 1
level: 1
tags: [hashing, hash-functions]
requires:
  - hashing-chaining
  - hashing-contract-direction
refs:
  - https://en.cppreference.com/w/cpp/named_req/Hash
---

## The set holds `"Bob"`. Why does looking up `"bob"` fail?

```cpp
struct NameHash {   // std::hash of the string as written
  size_t operator()(const std::string& s) const { return std::hash<std::string>{}(s); }
};
struct NameEq {     // lower(): an ASCII-lowercased copy
  bool operator()(const std::string& a, const std::string& b) const { return lower(a) == lower(b); }
};
std::unordered_set<std::string, NameHash, NameEq> s{"Bob"};
s.contains("bob");   // false
```

---

**Equal keys must hash equally; these two don't, so the lookup searches the wrong bucket.**

The table only compares keys inside the bucket the hash picks. If
`a == b` but `h(a) != h(b)`, `b`'s search never meets `a`. Collisions
between unequal keys are allowed; this is the one rule that is not.
