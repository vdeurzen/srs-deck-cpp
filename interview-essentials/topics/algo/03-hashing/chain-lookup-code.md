---
id: hashing-chain-lookup-code
kind: code
version: 1
level: 2
tags: [hashing, chaining]
input: chips
choices:
  c1: ["k % M", "k / M", "k % 4", "M % k"]
compile:
  harness: |
    // bucket 0: 10   bucket 2: 12 7 22   bucket 3: 3
    constexpr Table t{{1, 0, 3, 1, 0}, {{10}, {}, {12, 7, 22}, {3}, {}}};
    static_assert(contains(t, 7));
    static_assert(contains(t, 22));
    static_assert(contains(t, 10));
    static_assert(contains(t, 3));
    static_assert(!contains(t, 17));   // bucket 2, not in its chain
    static_assert(!contains(t, 1));    // empty bucket
    int main() {}
requires:
  - hashing-chaining
  - cpp-essentials/constexpr-fn-static-assert
elaborate: "Say aloud what this lookup costs when every key lands in one bucket, and what keeps that from happening in practice."
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
---

A chained table of `M` buckets; bucket `b` holds its chain in
`key[b][0]` … `key[b][len[b] - 1]`, and the hash function is `h(k) = k`.
Complete the line that picks the bucket to scan.

```cpp
constexpr int M = 5;
struct Table { int len[M]; int key[M][4]; };

constexpr bool contains(Table t, int k) {
  const int b = {{c1::k % M}};
  for (int j = 0; j < t.len[b]; ++j)
    if (t.key[b][j] == k) return true;
  return false;
}
```

---

**`k % M` names k's bucket: the only chain that can hold k.**
Insert put k at the end of that chain, so one call of `h` plus one chain scan
answers the lookup; no other bucket is looked at.

`k / M` and `k % 4` pick a bucket insert never used for k, so present
keys go missing; `M % k` can point past the last bucket.
