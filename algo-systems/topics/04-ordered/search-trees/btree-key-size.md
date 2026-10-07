---
id: ordered-btree-key-size
kind: code
version: 1
level: 4
tags: [trees, databases, external-memory]
requires:
  - ordered-btree-fanout
input: chips
choices:
  c1:
    - "page / (key + ptr)"
    - "page / key"
    - "page / ptr"
    - "page / key + ptr"
compile:
  harness: |
    constexpr long long kBillion = 1'000'000'000;
    static_assert(height(kBillion, fanout(4096, 8, 8)) == 4);
    static_assert(height(kBillion, fanout(8192, 8, 8)) == 4);
    static_assert(height(kBillion, fanout(16384, 8, 8)) == 3);
    static_assert(height(kBillion, fanout(4096, 64, 8)) == 6);   // wide keys
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://dl.acm.org/doi/10.1145/320521.320530
---

`height` counts the levels a B⁺-tree needs for `n` keys. Complete the
fanout of one internal page (page header ignored) so that widening the
key from 8 to 64 bytes costs the two levels it really does.

```cpp
constexpr long long fanout(long long page, long long key, long long ptr) {
  return {{c1::page / (key + ptr)}};
}

constexpr int height(long long n, long long fanout) {
  int h = 1;
  for (long long reach = fanout; reach < n; reach *= fanout) ++h;
  return h;
}
```

---

An internal entry is a separator key **plus** a child pointer, so 64-byte
keys cut the fanout from 256 to 56 and a billion keys need 6 levels, not
4. Key width is the lever you control that moves height most, more than
page size: that is the case for prefix compression, for keeping long
variable-length keys out of internal nodes, and for surrogate integer
keys in a wide index. Counting only the key (`page / key`) gives 64-way
fanout and 5 levels; counting only the pointer ignores the key entirely.
