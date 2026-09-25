---
id: hash-load-factor-and-probes
kind: cloze
version: 1
level: 4
tags: [hashing, complexity, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Linear_probing
  - https://abseil.io/about/design/swisstables
---

For a linear-probing table at load factor α, Knuth's analysis gives the
expected number of probes as about ½(1 + 1/(1 − α)) for a
{{c1::successful::the key is present}} search and about
½(1 + 1/(1 − α)²) for an unsuccessful one. The unsuccessful case is the
one to watch, because it is what an {{c2::insert::which must find an
empty slot}} pays, and because it grows with the {{c3::square::so it
blows up far earlier than intuition suggests}} of 1/(1 − α).

Put numbers on it: at α = 0.5 an unsuccessful search costs about 2.5
probes, at α = 0.75 about 8.5, and at α = 0.9 about {{c4::50::½(1 + 100)
= 50.5}}. That cliff is why open-addressed tables grow at a load factor
around 0.75–0.875 rather than waiting until they are nearly full, and
why the *maximum* probe length, not the average, is what a latency
budget has to be written against.

Two caveats keep the formula honest. It assumes {{c5::uniform
hashing::each key equally likely to land in each slot, independently}},
which a weak hash function violates outright — with a bad hash the table
degrades to a linear scan regardless of α. And it counts probes, not
cache misses: a group of 16 slots sharing a cache line makes the first
16 probes nearly free, which is exactly what Swiss tables exploit to
stay fast at load factors where the probe count alone looks alarming.
