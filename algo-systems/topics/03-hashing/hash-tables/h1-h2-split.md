---
id: hash-h1-h2-split
kind: code
version: 1
level: 4
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

The two halves must come from **disjoint bits**, which is the whole
reason for the shift. If the group index also used the low 7 bits,
every key in a group would carry the same control byte, the SIMD
compare would match all 16 slots, and the filter — the thing that
saves a key comparison and a cache miss on ~127 of every 128
probes — would be worthless.

The last two assertions state that property directly: `0x80` and
`0x81` land in the same group and are still distinguishable by their
control bytes.

The control byte's top bit is the tag that separates *states* from
hashes: a full slot stores `0b0hhh'hhhh`, while `kEmpty`
(`0b1000'0000`) and `kDeleted` (`0b1111'1110`) have the high bit set.
So one byte encodes both "is this slot occupied?" and "could this be
my key?", and one 16-byte SIMD compare answers both questions for a
whole group.

Two engineering notes. The real implementation masks rather than takes
a modulo, since the number of groups is a power of two — `% groups`
here keeps the card readable. And this split is exactly why the hash
function must **avalanche**: H1 and H2 come from the same 64 bits, so
a hash whose low bits are weak produces both a bad group distribution
and a useless control byte at the same time.
