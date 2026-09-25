---
id: hash-quality-low-bits
kind: basic
version: 1
level: 3
tags: [hashing, avalanche]
refs:
  - https://en.cppreference.com/w/cpp/utility/hash
  - https://en.wikipedia.org/wiki/Avalanche_effect
---

## `std::hash<int>` is the identity function on libstdc++. Why is that defensible, and when does it blow up?

---

It is defensible because the standard only requires `std::hash` to be a
function with few collisions *as a whole 64-bit value*, and the identity
has none at all: distinct ints hash to distinct values. The cost of
mixing was left to the container, and a node-based `unordered_map` with
a prime bucket count takes the modulo of the whole value, which spreads
low-entropy inputs reasonably well.

It blows up the moment the container keeps only *some* of the bits. A
flat table with a power-of-two capacity indexes with `h & (n − 1)` — the
low bits only. Then:

- Pointers as keys: the low 3–4 bits are zero for aligned objects, so
  every key lands in every sixteenth slot.
- Ids that are multiples of something (timestamps in microseconds,
  order ids allocated in blocks, row ids striped across shards): the
  same collapse.
- Sequential ids are the *good* case here — they fill consecutive
  slots — but any stride that shares a factor with the capacity is a
  disaster.

The property you actually want is **avalanche**: flipping any one input
bit flips each output bit with probability ½, so every subset of the
output carries the whole input's entropy. Standard fixes, cheapest
first: multiply by an odd 64-bit constant and take the *high* bits
(Fibonacci hashing); run a finaliser like splitmix64 or MurmurHash3's
`fmix64` (xor-shift, multiply, xor-shift, multiply, xor-shift); or use a
hash designed for it (`wyhash`, `xxh3`, `absl::Hash`).

Two practical notes. `absl` and `folly` mix internally, so a weak
`std::hash` costs less there than in a hand-rolled table. And if the keys
are adversarial — anything derived from user input reaching a
server — mixing is not enough: you need a **keyed** hash with a
per-process random seed, or a request can be built to collide every key
into one bucket and turn your O(1) table into a quadratic denial of
service.
