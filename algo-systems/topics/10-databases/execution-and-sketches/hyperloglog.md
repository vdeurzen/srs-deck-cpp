---
id: db-hyperloglog
kind: basic
version: 1
level: 5
tags: [databases, sketches, probabilistic]
requires:
  - hash-quality-low-bits
refs:
  - http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf
  - https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/40671.pdf
---

## How does HyperLogLog estimate distinct counts in a few kilobytes, and what is its error?

---

The core observation: hash each element to a uniform bit string, and
look at the position of the **first 1 bit**. A run of `k` leading
zeros appears with probability 2^−k, so seeing a maximum run of `k`
suggests roughly 2^k distinct elements. One such estimator is wildly
noisy, so HLL **splits by the first `p` bits of the hash into
m = 2^p registers**, keeps the maximum leading-zero count per register,
and combines them with a **harmonic mean** (which suppresses the
outliers that drag an arithmetic mean upward), times a bias-correcting
constant.

The numbers to remember: the standard error is **1.04/√m**, each
register needs 6 bits (enough for a 64-bit hash's run length), so

- m = 2048 → 1.5 KB → ~2.3 % error
- m = 16384 → 12 KB → ~0.81 % error

— and the size is **independent of the cardinality**, whether you are
counting a thousand distinct users or a billion.

The property that makes it a system building block is **mergeability**:
the union of two HLLs is the element-wise **maximum** of their
registers, exactly, with no loss. So every shard, every hour, every
service can keep its own sketch, and any combination of them can be
counted after the fact. That is what makes "distinct users, any slice,
any time range" answerable without storing the users.

Practical refinements, all in HLL++ and in the implementations you will
meet (Redis `PFCOUNT`, BigQuery `APPROX_COUNT_DISTINCT`, Presto,
Druid): a **sparse representation** for small cardinalities (store the
observed (index, run) pairs, which is both smaller and exact-ish until
it grows), 64-bit hashes to avoid collisions near 2³², and empirical
bias correction in the low range.

What it cannot do: tell you *which* elements were seen, give an exact
answer, or intersect accurately — `|A ∩ B| = |A| + |B| − |A ∪ B|` with
two noisy estimates can be catastrophically wrong when the sets are
large and the intersection is small. For intersections, use a
different sketch (MinHash, theta sketches).
