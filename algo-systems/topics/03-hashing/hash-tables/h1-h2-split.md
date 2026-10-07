---
id: hash-h1-h2-split
kind: code
version: 1
level: 4
requires:
  - hash-swiss-table-metadata
tags: [hashing, open-addressing, simd]
input: chips
choices:
  c1: ["hash >> 7", "hash & 0x7F", "hash >> 57", "hash"]
compile:
  harness: |
    static_assert(control_of(0x80) == 0x00);
    static_assert(control_of(0x7F) == 0x7F);
    static_assert(group_of(0x80, 16) == 1);
    static_assert(group_of(0x3F80, 16) == 15);
    static_assert(group_of(0x4000, 16) == 0);
    // Two keys in the same group are still told apart by their control byte.
    static_assert(group_of(0x80, 16) == group_of(0x81, 16));
    static_assert(control_of(0x80) != control_of(0x81));
    int main() {}
refs:
  - https://abseil.io/about/design/swisstables
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h
---

A Swiss table splits one hash in two: **H2**, the low 7 bits, becomes
the slot's control byte, and **H1**, everything else, picks the group.
Complete `group_of`.

```cpp
#include <cstddef>
#include <cstdint>

constexpr std::uint8_t control_of(std::uint64_t hash) {
  return static_cast<std::uint8_t>(hash & 0x7F);       // H2
}

constexpr std::size_t group_of(std::uint64_t hash, std::size_t groups) {
  return static_cast<std::size_t>({{c1::hash >> 7}}) % groups;   // H1
}
```

---

The two halves must come from **disjoint bits**. If the group index
also used the low 7 bits, every key in a group would carry the same
control byte, the SIMD compare would match all 16 slots, and the filter
that skips ~127 of every 128 key comparisons would be worthless.

This follows the published design (low 7 bits for H2). Abseil's current
`raw_hash_set.h` takes H2 from the *top* 7 bits and indexes with the low
ones; the rule is the same either way: disjoint bits.
