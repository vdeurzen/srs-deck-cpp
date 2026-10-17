---
id: hashing-contract-code
kind: code
version: 1
level: 2
tags: [foundations, hash-functions]
requires:
  - interview-essentials/hashing-contract-direction
input: chips
choices:
  c1: ["p.x * 31 + p.y", "p.x * 31 + p.y + p.hits", "p.hits", "p.x * 31 + p.hits"]
compile:
  harness: |
    constexpr Point a{2, 5, 0}, b{2, 5, 7}, c{5, 2, 0};
    static_assert(a == b);
    static_assert(hash(a) == hash(b));
    static_assert(hash(a) != hash(c));
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/named_req/Hash
---

Complete a hash for `Point` that a hash table can rely on.

```cpp
struct Point { int x, y, hits; };

constexpr bool operator==(const Point& a, const Point& b) {
  return a.x == b.x && a.y == b.y;
}

constexpr int hash(const Point& p) { return {{c1::p.x * 31 + p.y}}; }
```

---

**Hash only what `==` compares.** Two points equal under `==` but with
different `hits` would then still hash alike, so a lookup reaches the
bucket where the point was stored.

Any formula that reads `hits` lets equal points land in different
buckets, and a lookup for one misses the other.
