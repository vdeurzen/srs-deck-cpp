---
id: hash-primary-clustering
kind: basic
version: 1
level: 3
requires:
  - hash-load-factor-and-probes
  - algo-basics/hashing-linear-probe-step
tags: [hashing, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Linear_probing
  - https://en.wikipedia.org/wiki/Primary_clustering
---

## With linear probing, why does a run of occupied slots grow faster the longer it already is?

```
slots: . . X X X X X . .   a key hashing to any X lands at the right end
```

---

**Any key hashing into a run lands at its end, extending it: primary clustering.**

A run of length `k` is hit by `k` home slots, so long runs capture more
new keys than short ones and adjacent runs merge. Probe lengths then
depend on how occupancy is distributed, not only on load factor.
