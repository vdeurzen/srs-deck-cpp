---
id: hashing-equal-keys-equal-hashes
kind: basic
version: 1
level: 1
tags: [hashing, hash-functions]
requires:
  - hashing-chaining
refs:
  - https://en.cppreference.com/w/cpp/named_req/Hash
---

## A set compares names case-insensitively but hashes them case-sensitively. It holds `"Bob"`. Why does looking up `"bob"` fail?

```cpp
std::unordered_set<std::string, CaseSensitiveHash, CaseInsensitiveEq> s{"Bob"};
s.contains("bob");   // false
```

---

**Equal keys must hash equally; these two don't, so the lookup searches the wrong bucket.**

The table only compares keys inside the bucket the hash picks. If
`a == b` but `h(a) != h(b)`, `b`'s search never meets `a`. Collisions
between unequal keys are allowed; this is the one rule that is not.
